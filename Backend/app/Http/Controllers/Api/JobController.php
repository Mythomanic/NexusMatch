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
        // İşi jobs tablosunda ID ile bul
        $job = Job::find($jobId);
    
        // İş bulunamazsa 404 döndür
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
            $likedUserIds = $job->likes; // Assuming likes is an array
            // Bu ID'lere sahip kullanıcıları sorgula
            $likedUsers = User::whereIn('id', $likedUserIds)->get();
        }
    
    
        return response()->json([
            'status' => true,
            'likedUsers' => $likedUsers
        ], 200);
    }


    public function moveUserFromLikesToDislikes($jobId, $userId)
    {
        // İlgili işi buluyoruz
        $job = Job::findOrFail($jobId);

        // Kullanıcıyı likes array'inden çıkar
        $likes = $job->likes ?? [];
        if (($key = array_search($userId, $likes)) !== false) {
            unset($likes[$key]);
            $job->likes = array_values($likes); // Diziyi yeniden indeksle
        }

        // Kullanıcıyı dislikes array'ine ekle
        $dislikes = $job->dislikes ?? [];
        if (!in_array($userId, $dislikes)) {
            $dislikes[] = $userId;
            $job->dislikes = $dislikes;
        }

        // Değişiklikleri kaydet
        $job->save();

        return response()->json(['message' => 'User moved from likes to dislikes successfully.']);
    }

    public function filterByPosition(Request $request, $userId)
    {
        // Gelen position parametresini al ve küçük harfe çevir
        $position = strtolower($request->input('position'));

        // Position'a göre büyük/küçük harfe duyarsız filtreleme yap
        $allJobs = Job::whereRaw('LOWER(position) = ?', [$position])->get();

        // Kullanıcının likes veya dislikes kolonunda olmadığı işleri filtrele
        $unseenJobs = $allJobs->filter(function($job) use ($userId) {
            $likes = $job->likes ?? [];
            $dislikes = $job->dislikes ?? [];

            return !in_array($userId, $likes) && !in_array($userId, $dislikes);
        });

        return response()->json($unseenJobs->values());
    }
}
