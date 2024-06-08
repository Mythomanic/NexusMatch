<?php

namespace App\Http\Controllers\Api;
use App\Models\Job;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Job::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'requirements' => 'required|string',
        ]);

        $userId = auth()->id();

        $job = Job::create([
            'user_id' => $userId,
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'salary' => $request->salary,
            'requirements' => $request->requirements,
            ]
        );

        return response()->json($job, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        return $job;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  Job $job)
    {
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'location' => 'string|max:255',
            'salary' => 'numeric',
            'requirements' => 'string',
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
        // İşi jobs tablosunda ID ile bul
        $job = Job::find($jobId);
    
        // İş bulunamazsa 404 döndür
        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found'
            ], 404);
        }
    
        // Likes dizisini al
        $likedUserIds = $job->likes; // Assuming likes is an array
    
        // Bu ID'lere sahip kullanıcıları sorgula
        $likedUsers = User::whereIn('id', $likedUserIds)->get(['id', 'name', 'email', 'avatarJob']);
    
        return response()->json([
            'status' => true,
            'likedUsers' => $likedUsers
        ], 200);
    }
}
