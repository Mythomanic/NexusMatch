<?php

namespace App\Http\Controllers\Api;
use App\Models\JobFilter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class JobFilterController extends Controller
{
    public function index()
    {
        return JobFilter::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'filter_name' => 'required|string',
            'filter_value' => 'required|string',
        ]);

        $filter = JobFilter::create($request->all());

        return response()->json($filter, 201);
    }

    public function show(JobFilter $filter)
    {
        return $filter;
    }

    public function destroy(JobFilter $filter)
    {
        $filter->delete();

        return response()->json(null, 204);
    }
}
