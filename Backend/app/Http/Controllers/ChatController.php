<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\User;

class ChatController extends Controller
{
    public function createChat(Request $request)
    {
        $request->validate([
            'user2_id' => 'required|exists:users,id',
        ]);

        $user1_id = auth()->id();
        $user2_id = $request->user2_id;

        // Daha önce bu kullanıcılar arasında bir chat olup olmadığını kontrol edin
        $existingChat = Chat::where(function($query) use ($user1_id, $user2_id) {
            $query->where('user1_id', $user1_id)->where('user2_id', $user2_id);
        })->orWhere(function($query) use ($user1_id, $user2_id) {
            $query->where('user1_id', $user2_id)->where('user2_id', $user1_id);
        })->first();

        if ($existingChat) {
            return response()->json([
                'status' => true,
                'message' => 'Chat already exists!',
                'chat' => $existingChat
            ], 200);
        }

        $chat = Chat::create([
            'user1_id' => $user1_id,
            'user2_id' => $user2_id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Chat created successfully!',
            'chat' => $chat
        ], 201);
    }

    public function fetchChats()
    {
        $user_id = auth()->id();
        $chats = Chat::where('user1_id', $user_id)
                      ->orWhere('user2_id', $user_id)
                      ->with(['user1', 'user2'])
                      ->get();

        return response()->json([
            'status' => true,
            'chats' => $chats
        ], 200);
    }


}
