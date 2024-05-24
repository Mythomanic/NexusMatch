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
    public function getTags(User $user)
    {
        return response()->json([
            'status' => true,
            'tags' => $user->tags
        ], 200);
    }    
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
    public function logout(Request $request)
    {
        try {
            // Kullanıcının tüm tokenlarını iptal et
            $request->user()->tokens()->delete();

            return response()->json([
                'status' => true,
                'message' => 'User Logged Out Successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function updateAvatar(Request $request, User $user){
        {
            $request->validate([
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        
            $user = Auth::user();
        
            if ($request->hasFile('avatar')) {
                // Eski avatarı sil
                if ($user->avatar) {
                    Storage::delete('public/avatars/' . $user->avatar);
                }
        
                // Yeni avatarı kaydet
                $filename = $request->file('avatar')->store('avatars', 'public');
                $user->avatar = basename($filename);
            }
        
            $user->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully.',
                'avatar' => $user->avatar
            ], 200);
        }
    
    }

    public function showUser()
    {
        $user = User::find(1); // ID'si 1 olan kullanıcıyı çek
        return view('usercontrol', compact('user'));
    }
    public function getJobProfile($id)
    {
        // Kullanıcıyı ID ile bul
        $user = User::find($id);

        // Kullanıcı bulunamazsa 404 döndür
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // İlgili kolonları seç
        $jobProfile = $user->only(['name', 'email', 'avatarJob', 'tagsJob', 'descriptionJob', 'userJob', 'jobGallery']);

        return response()->json([
            'status' => true,
            'jobProfile' => $jobProfile
        ], 200);
    }
    public function updateUserProfile(Request $request, User $user)
    {
        // Validate the request data
        $validateData = Validator::make($request->all(), [
            "name" => "sometimes|required|string",
            "email" => "sometimes|required|email",
            "password" => "sometimes|required|confirmed",
            "password_confirmation" => "sometimes|required_with:password",
            "avatarJob" => "sometimes|nullable|string",
            "tagsJob" => "sometimes|nullable|array",
            "descriptionJob" => "sometimes|nullable|string",
            "userJob" => "sometimes|nullable|string",
            "jobGallery" => "sometimes|nullable|array",
            "tag" => "sometimes|required|string",
            "removeTag" => "sometimes|required|string",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateData->errors()
            ], 400);
        }
        // Update the user's fields based on the request inputs
        if ($request->has('name')) {
            $user->name = $request->input('name');
        }
        if ($request->has('email')) {
            $user->email = $request->input('email');
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->input('password'));
        }
        if ($request->has('avatarJob')) {
            $user->avatarJob = $request->input('avatarJob');
        }
        if ($request->has('tagsJob')) {
            $user->tagsJob = $request->input('tagsJob');
        }
        if ($request->has('descriptionJob')) {
            $user->descriptionJob = $request->input('descriptionJob');
        }
        if ($request->has('userJob')) {
            $user->userJob = $request->input('userJob');
        }
        if ($request->has('jobGallery')) {
            $user->jobGallery = $request->input('jobGallery');
        }

        // Adding a tag
        if ($request->has('tag') && !$request->has('removeTag')) {
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

        // Removing a tag
        if ($request->has('removeTag')) {            
            $tags = $user->tags;
            
            // Remove quotes from tags
            $tags = array_map(function($tag) {
                return trim($tag, "'");
            }, $tags);
        
            // Debugging purposes
            $searchTag = $request->input('removeTag');
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

        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User profile updated successfully',
            'user' => $user
        ], 200);
    }
}