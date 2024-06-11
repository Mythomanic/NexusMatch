<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Job;
use App\Models\Event;

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
    public function showUser()
    {
        $user = User::find(1); // ID'si 1 olan kullanıcıyı çek
        return view('usercontrol', compact('user'));
    }
    public function updateUserProfile(Request $request, User $user)
    {
        // Validate the request data
        $validateData = Validator::make($request->all(), [
            "name" => "sometimes|required|string",
            "email" => "sometimes|required|email",
            "password" => "sometimes|required|confirmed",
            "password_confirmation" => "sometimes|required_with:password",
            "tagJob" => "sometimes|nullable|string",
            "descriptionJob" => "sometimes|nullable|string",
            "tagEvent" => "sometimes|nullable|string",
            "descriptionEvent" => "sometimes|nullable|string",
            "userJob" => "sometimes|nullable|string",
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
        if ($request->has('tagJob')) {
            $tagsJob = $user->tagsJob; 

            $tagsJob[] = $request->input('tagJob');
            $user->tagsJob = $tagsJob;
            $user->save();
            return response()->json([
                'status' => true,
                'message' => 'Tag added successfully',
                'tagsJob' => $user->tagsJob
            ], 200);
        }
        if ($request->has('removeTagJob')) {            
            $tagsJob = $user->tagsJob;
            
            // Remove quotes from tags
            $tagsJob = array_map(function($tag) {
                return trim($tag, "'");
            }, $tagsJob);
        
            // Debugging purposes
            $searchTag = $request->input('removeTagJob');
            $key = array_search($searchTag, $tagsJob);
        
            if ($key !== false) {
                unset($tagsJob[$key]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Tag not found',
                    'debug' => [
                        'searchTag' => $searchTag,
                        'tagsJob' => $tagsJob,
                        'key' => $key,
                    ]
                ], 404);
            }
        
            // Reindex the array to avoid any issues with array structure
            $user->tagsJob = array_values($tagsJob);
            $user->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Tag removed successfully',
                'tagsJob' => $user->tagsJob
            ], 200);
        }
        if ($request->has('descriptionJob')) {
            $user->descriptionJob = $request->input('descriptionJob');
        }
        if ($request->has('userJob')) {
            $user->userJob = $request->input('userJob');
        }

        if ($request->has('tagEvent')) {
            $tagsEvent = $user->tagsEvent; 

            $tagsEvent[] = $request->input('tagEvent');
            $user->tagsEvent = $tagsEvent;
            $user->save();
            return response()->json([
                'status' => true,
                'message' => 'Tag added successfully',
                'tagsEvent' => $user->tagsEvent
            ], 200);
        }
        if ($request->has('removeTagEvent')) {            
            $tagsEvent = $user->tagsEvent;
            
            // Remove quotes from tags
            $tagsEvent = array_map(function($tag) {
                return trim($tag, "'");
            }, $tagsEvent);
        
            // Debugging purposes
            $searchTag = $request->input('removeTagEvent');
            $key = array_search($searchTag, $tagsEvent);
        
            if ($key !== false) {
                unset($tagsEvent[$key]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Tag not found',
                    'debug' => [
                        'searchTag' => $searchTag,
                        'tagsEvent' => $tagsEvent,
                        'key' => $key,
                    ]
                ], 404);
            }
        
            // Reindex the array to avoid any issues with array structure
            $user->tagsEvent = array_values($tagsEvent);
            $user->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Tag removed successfully',
                'tagsEvent' => $user->tagsEvent
            ], 200);
        }
        if ($request->has('descriptionEvent')) {
            $user->descriptionEvent = $request->input('descriptionEvent');
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
    

    //Job
    public function updateAvatarJob(Request $request, User $user){
        
            $request->validate([
                'avatarJob' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        
            $user = Auth::user();
        
            if ($request->hasFile('avatarJob')) {
                // Eski avatarı sil
                if ($user->avatarJob) {
                    Storage::delete('public/avatars/' . $user->avatarJob);
                }
        
                // Yeni avatarı kaydet
                $filename = $request->file('avatarJob')->store('avatars', 'public');
                $user->avatarJob = basename($filename);
            }
        
            $user->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully.',
                'avatarJob' => $user->avatarJob
            ], 200);
        
    }
    public function swipe(Request $request, User $user, $jobId)
    {
        // İstekten kullanıcı ID'sini ve swipe yönünü alıyoruz
        $userId = $user->id;
        $direction = $request->input('direction'); // "like" veya "dislike"

        // İlgili işi buluyoruz
        $job = Job::findOrFail($jobId);

        if ($direction === 'like') {
            // Kullanıcı ID'sini likes array'ine ekle
            $likes = $job->likes ?? [];
            if (!in_array($userId, $likes)) {
                $likes[] = $userId;
                $job->likes = $likes;
            }
        } elseif ($direction === 'dislike') {
            // Kullanıcı ID'sini dislikes array'ine ekle
            $dislikes = $job->dislikes ?? [];
            if (!in_array($userId, $dislikes)) {
                $dislikes[] = $userId;
                $job->dislikes = $dislikes;
            }
        }

        // Değişiklikleri kaydet
        $job->save();

        return response()->json(['message' => 'Swipe updated successfully.']);
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
    public function getUserJobs($userId)
    {
    // Kullanıcıyı ID ile bul
        $user = User::find($userId);

        // Kullanıcı bulunamazsa 404 döndür
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Kullanıcı tarafından oluşturulan işleri al
        $jobs = Job::where('user_id', $userId)->get();

        // Eğer kullanıcı hiç iş oluşturmadıysa
        if ($jobs->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No jobs found for this user'
            ], 404);
        }

        // İşleri JSON formatında döndür
        return response()->json([
            'status' => true,
            'jobs' => $jobs
        ], 200);
    }
    public function getUnseenJobs($userId)
    {
         // Tüm işleri çekiyoruz
        $allJobs = Job::all();

        // Kullanıcının likes veya dislikes kolonunda olmadığı işleri filtreliyoruz
        $unseenJobs = $allJobs->filter(function($job) use ($userId) {
            $likes = $job->likes ?? [];
            $dislikes = $job->dislikes ?? [];

            return !in_array($userId, $likes) && !in_array($userId, $dislikes);
        });

        return response()->json($unseenJobs->values());
 
    }


    //Event
    public function updateAvatarEvent(Request $request, User $user){
        
            $request->validate([
                'avatarEvent' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        
            $user = Auth::user();
        
            if ($request->hasFile('avatarEvent')) {
                // Eski avatarı sil
                if ($user->avatarEvent) {
                    Storage::delete('public/avatars/' . $user->avatarEvent);
                }
        
                // Yeni avatarı kaydet
                $filename = $request->file('avatarEvent')->store('avatars', 'public');
                $user->avatarEvent = basename($filename);
            }
        
            $user->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully.',
                'avatarEvent' => $user->avatarEvent
            ], 200);
        
    }
    public function swipeEvent(Request $request, User $user, $eventId)
    {
        // İstekten kullanıcı ID'sini ve swipe yönünü alıyoruz
        $userId = $user->id;
        $direction = $request->input('direction'); // "like" veya "dislike"

        // İlgili işi buluyoruz
        $event = Event::findOrFail($eventId);

        if ($direction === 'like') {
            // Kullanıcı ID'sini likes array'ine ekle
            $likes = $event->likes ?? [];
            if (!in_array($userId, $likes)) {
                $likes[] = $userId;
                $event->likes = $likes;
            }
        } elseif ($direction === 'dislike') {
            // Kullanıcı ID'sini dislikes array'ine ekle
            $dislikes = $event->dislikes ?? [];
            if (!in_array($userId, $dislikes)) {
                $dislikes[] = $userId;
                $event->dislikes = $dislikes;
            }
        }

        // Değişiklikleri kaydet
        $event->save();
        return response()->json(['message' => 'Swipe updated successfully.']);
    }
    public function getEventProfile($id)
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
        $eventProfile = $user->only(['name', 'email', 'avatarEvent', 'tagsEvent', 'descriptionEvent']);

        return response()->json([
            'status' => true,
            'eventProfile' => $eventProfile
        ], 200);
    }
    public function getUserEvents($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        $events = Event::where('user_id', $userId)->get();

        if ($events->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No events found for this user'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'events' => $events
        ], 200);
    }
    public function getUnseenEvents($userId)
    {
         // Tüm işleri çekiyoruz
        $allEvents = Event::all();

        // Kullanıcının likes veya dislikes kolonunda olmadığı işleri filtreliyoruz
        $unseenEvents = $allEvents->filter(function($event) use ($userId) {
            $likes = $event->likes ?? [];
            $dislikes = $event->dislikes ?? [];

            return !in_array($userId, $likes) && !in_array($userId, $dislikes);
        });

        return response()->json($unseenEvents->values());
 
    }
}