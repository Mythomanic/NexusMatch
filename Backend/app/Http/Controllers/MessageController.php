<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatMessage;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function fetchMessages($chatId)
    {
        $messages = ChatMessage::where('chat_id', $chatId)->with('user')->get();

        return response()->json([
            'status' => true,
            'messages' => $messages
        ], 200);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'message' => 'required|string'
        ]);

        $message = ChatMessage::create([
            'chat_id' => $request->chat_id,
            'user_id' => auth()->id(),
            'message' => $request->message
        ]);

        broadcast(new MessageSent($message->load('user')))->toOthers();

        return response()->json([
            'status' => true,
            'response' => 'Message sent successfully!',
            'message' => $message
        ], 201);
    }
}