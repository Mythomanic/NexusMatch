<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function create(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed',
                'password_confirmation' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::where("id",$id)->first();
        if (!$user)
            return response()->json(['message' => 'There is no user with this id']);
        return response()->json($user, 200);
    }

    public function showAll()
    {
        $user = User::all();
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $validateUser = Validator::make($request->all(), [
            "name" => "required",
            "email"=> "required|email|unique:users,email,".$id,
            "password"=> "required|confirmed",
            "password_confirmation" => "required",
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateUser->errors()
            ], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'There is no user with this id'], 404);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User edited successfully',
        ], 200);
    }

    public function editName(Request $request, User $user){
        $validateName = Validator::make($request->all(), [
            "name" => "required",
        ]);

        if ($validateName->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateName->errors()
            ], 400);
        }

        $user->name = $request->name;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User edited successfully',
        ], 200);
    }
    public function editEmail(Request $request, User $user){
        $validateEmail = Validator::make($request->all(), [
            "email" => "required",
        ]);

        if ($validateEmail->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateEmail->errors()
            ], 400);
        }

        $user->email = $request->email;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User edited successfully',
        ], 200);
    }
    public function editPassword(Request $request, User $user){
        $validatePassword = Validator::make($request->all(), [
            "password" => "required|confirmed",
            "password_confirmation" => "required",
        ]);

        if ($validatePassword->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validatePassword->errors()
            ], 400);
        }

        $user->email = $request->email;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User edited successfully',
        ], 200);
    }

    public function addTag(Request $request, User $user){
        $validateTag = Validator::make($request->all(), [
            "tag" => "required",
        ]);
        if ($validateTag->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateTag->errors()
            ], 400);
        }
        $tags = $user->tags; 

        $tags[] = $request->input('tag');
        $user->tags = $tags;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Tag added successfully',
            'tags' => $user->tags
        ], 200);
    }


    public function removeTag(Request $request, User $user){
        $validateTag = Validator::make($request->all(), [
            "tag" => "required",
        ]);
        if ($validateTag->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateTag->errors()
            ], 400);
        }
        
        $tags = $user->tags;
        
        // Remove quotes from tags
        $tags = array_map(function($tag) {
            return trim($tag, "'");
        }, $tags);
    
        // Debugging purposes
        $searchTag = $request->input('tag');
        $key = array_search($searchTag, $tags);
    
        if ($key !== false) {
            unset($tags[$key]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Tag not found',
                'debug' => [
                    'searchTag' => $searchTag,
                    'tags' => $tags,
                    'key' => $key,
                ]
            ], 404);
        }
    
        // Reindex the array to avoid any issues with array structure
        $user->tags = array_values($tags);
        $user->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Tag removed successfully',
            'tags' => $user->tags
        ], 200);
    }

    public function getTags(User $user)
    {
        return response()->json([
            'status' => true,
            'tags' => $user->tags
        ], 200);
    }

    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user)
            return response()->json(['message' => 'There is no user with this id']);

        User::destroy($id);
        return response()->json(["message" => "User deleted successfully"]);
    }

    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'id' => $user->id,
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateAvatar(Request $request, User $user){
        $request->validate([
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        if ($request->hasFile('avatar')) {
            // Delete the old profile picture if exists
            if ($user->avatar) {
                Storage::delete('public/avatars/' . $user->avatar);
            }
    
            // Store the new profile picture
            $filename = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = basename($filename);
        }
    
        $user->save();
        
        return redirect()->back()->with('success', 'Profile updated successfully.');
    
    }

    public function showUser()
    {
        $user = User::find(1); // ID'si 1 olan kullanıcıyı çek
        return view('usercontrol', compact('user'));
    }
}