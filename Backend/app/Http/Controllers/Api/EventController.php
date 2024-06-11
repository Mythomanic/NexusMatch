<?php

namespace App\Http\Controllers\Api;
use App\Models\Event;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'requirements' => 'required|string',
        ]);

        $userId = auth()->id();

        $event = Event::create([
            'user_id' => $userId,
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'requirements' => $request->requirements,
            ]
        );

        return response()->json($event, 201);
    }


    public function show(Event $event)
    {
        return $event;
    }


    public function update(Request $request,  Event $event)
    {
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'location' => 'string|max:255',
            'requirements' => 'string',
        ]);

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json(null, 204);
    }

    public function getLikedUsers($eventId)
    {
        $event = Event::find($eventId);
    
        if (!$event) {
            return response()->json([
                'status' => false,
                'message' => 'Event not found'
            ], 404);
        }
        
        if (is_null($event->likes)) {
            $likedUsers = [];
        }
        else {
            $likedUserIds = $event->likes; 
            $likedUsers = User::whereIn('id', $likedUserIds)->get();
        }
    
    
        return response()->json([
            'status' => true,
            'likedUsers' => $likedUsers
        ], 200);
    }


    public function moveUserFromLikesToDislikes($eventId, $userId)
    {
        $event = Event::findOrFail($eventId);

        $likes = $event->likes ?? [];
        if (($key = array_search($userId, $likes)) !== false) {
            unset($likes[$key]);
            $event->likes = array_values($likes); 
        }

        $dislikes = $event->dislikes ?? [];
        if (!in_array($userId, $dislikes)) {
            $dislikes[] = $userId;
            $event->dislikes = $dislikes;
        }

        $event->save();

        return response()->json(['message' => 'User moved from likes to dislikes successfully.']);
    }

    public function filterByTitle(Request $request, $userId)
    {
        $title = strtolower($request->input('title'));

        $allEvents = Event::whereRaw('LOWER(title) = ?', [$title])->get();

        $unseenEvents = $allEvents->filter(function($event) use ($userId) {
            $likes = $event->likes ?? [];
            $dislikes = $event->dislikes ?? [];

            return !in_array($userId, $likes) && !in_array($userId, $dislikes);
        });

        return response()->json($unseenEvents->values());
    }
}
