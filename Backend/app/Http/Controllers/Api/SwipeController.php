<?php

namespace App\Http\Controllers\Api;
use App\Models\Swipe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SwipeController extends Controller
{
    public function index()
    {
        return Swipe::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'job_id' => 'required|exists:jobs,id',
            'direction' => 'required|in:left,right',
        ]);

        $swipe = Swipe::create($request->all());

        return response()->json($swipe, 201);
    }

    public function show(Swipe $swipe)
    {
        return $swipe;
    }

    public function destroy(Swipe $swipe)
    {
        $swipe->delete();

        return response()->json(null, 204);
    }
}
