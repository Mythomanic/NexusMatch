<?php

namespace App\Http\Controllers\Api;
use App\Models\MatchJob;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index()
    {
        return MatchJob::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'job_id' => 'required|exists:jobs,id',
        ]);

        $match = MatchJob::create($request->all());

        return response()->json($match, 201);
    }

    public function show(MatchJob $match)
    {
        return $match;
    }

    public function destroy(MatchJob $match)
    {
        $match->delete();

        return response()->json(null, 204);
    }
}