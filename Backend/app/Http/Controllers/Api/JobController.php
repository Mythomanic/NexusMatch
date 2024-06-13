<?php

namespace App\Http\Controllers\Api;
use App\Models\Job;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class JobController extends Controller
{
    
    public function index()
    {
        return Job::all();
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'requirements' => 'required|string',
            'position' => 'required|string',
        ]);

        $userId = auth()->id();

        $job = Job::create([
            'user_id' => $userId,
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'salary' => $request->salary,
            'requirements' => $request->requirements,
            'position' =>$request->position,
            ]
        );

        return response()->json($job, 201);
    }
    public function show(Job $job)
    {
        return $job;
    }
    public function update(Request $request,  Job $job)
    {
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'location' => 'string|max:255',
            'salary' => 'numeric',
            'requirements' => 'string',
            'position'=>'string',
        ]);

        $job->update($request->all());

        return response()->json($job);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json(null, 204);
    }
    public function getLikedUsers($jobId)
    {
        $job = Job::find($jobId);
    
        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found'
            ], 404);
        }
        
        if (is_null($job->likes)) {
            $likedUsers = [];
        }
        else {
            $likedUserIds = $job->likes; 
            $likedUsers = User::whereIn('id', $likedUserIds)->get();
        }
    
    
        return response()->json([
            'status' => true,
            'likedUsers' => $likedUsers
        ], 200);
    }
    public function moveUserFromLikesToDislikes($jobId, $userId)
    {
        $job = Job::findOrFail($jobId);

        $likes = $job->likes ?? [];
        if (($key = array_search($userId, $likes)) !== false) {
            unset($likes[$key]);
            $job->likes = array_values($likes); 
        }

        $dislikes = $job->dislikes ?? [];
        if (!in_array($userId, $dislikes)) {
            $dislikes[] = $userId;
            $job->dislikes = $dislikes;
        }

        $job->save();

        return response()->json(['message' => 'User moved from likes to dislikes successfully.']);
    }
    public function filterByPosition(Request $request, $userId)
    {
        $position = strtolower($request->input('position'));

        if (empty($position)) {
            $allJobs = Job::all();
        } else {
            $allJobs = Job::whereRaw('LOWER(position) = ?', [$position])->get();
        }

        $unseenJobs = $allJobs->filter(function($job) use ($userId) {
            $likes = $job->likes ?? [];
            $dislikes = $job->dislikes ?? [];

            return !in_array($userId, $likes) && !in_array($userId, $dislikes);
        });

        return response()->json($unseenJobs->values());
    }
}
