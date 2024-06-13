<?php

namespace App\Http\Controllers\Api;
use App\Models\Date;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DateController extends Controller
{
    public function index()
    {
        return Date::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'ownGender' => 'required|string',
            'desiredGender' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
        ]);

        $userId = auth()->id();

        $date = Date::create([
            'user_id' => $userId,
            'title' => $request->title,
            'ownGender' => $request->ownGender,
            'desiredGender' => $request->desiredGender,
            'description' => $request->description,
            'location' => $request->location,
            ]
        );

        return response()->json($date, 201);
    }

    public function show(Date $date)
    {
        return $date;
    }

    public function update(Request $request,  Date $date)
    {
        $request->validate([
            'title' => 'string|max:255',
            'ownGender' => 'required|string',
            'desiredGender' => 'required|string',
            'description' => 'string',
            'location' => 'string|max:255',
        ]);

        $date->update($request->all());

        return response()->json($date);
    }

    public function destroy(Date $date)
    {
        $date->delete();

        return response()->json(null, 204);
    }

    public function getLikedUsers($dateId)
    {
        $date = Date::find($dateId);
    
        if (!$date) {
            return response()->json([
                'status' => false,
                'message' => 'Date not found'
            ], 404);
        }
        
        if (is_null($date->likes)) {
            $likedUsers = [];
        }
        else {
            $likedUserIds = $date->likes; 
            $likedUsers = User::whereIn('id', $likedUserIds)->get();
        }
    
    
        return response()->json([
            'status' => true,
            'likedUsers' => $likedUsers
        ], 200);
    }


    public function moveUserFromLikesToDislikes($dateId, $userId)
    {
        $date = Date::findOrFail($dateId);

        $likes = $date->likes ?? [];
        if (($key = array_search($userId, $likes)) !== false) {
            unset($likes[$key]);
            $date->likes = array_values($likes); 
        }

        $dislikes = $date->dislikes ?? [];
        if (!in_array($userId, $dislikes)) {
            $dislikes[] = $userId;
            $date->dislikes = $dislikes;
        }

        $date->save();

        return response()->json(['message' => 'User moved from likes to dislikes successfully.']);
    }


    public function filterByOwnGender(Request $request, $userId)
    {
        $ownGender = strtolower($request->input('ownGender'));
        if (empty($ownGender)) {
            $allDates = Date::all();
        } else {
            $allDates = Date::whereRaw('LOWER(own$ownGender) = ?', [$ownGender])->get();
        }
        $unseenDates = $allDates->filter(function($dates) use ($userId) {
            $likes = $dates->likes ?? [];
            $dislikes = $dates->dislikes ?? [];

            return !in_array($userId, $likes) && !in_array($userId, $dislikes);
        });

        return response()->json($unseenDates->values());
    }

}
