import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import messageService from "../services/messageService";
import authService from "../services/authService";
import "../css/Chat.css";

function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userToken = authService.getCurrentUser().token;
  const userId = authService.getCurrentUser().id;
  const [loggedInUserJobInfo, setLoggedInUserJobInfo] = useState({});
  const sentMessageIds = useRef(new Set());

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await messageService.fetchMessages(chatId);
        const loadedMessages = fetchedMessages.messages.map((msg) => ({
          _id: msg.id,
          text: msg.message,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.user_id,
            name: msg.user.name,
            avatar: msg.user.avatar,
          },
        }));
        setMessages(loadedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await authService.getUserProfile(userId);
        setLoggedInUserJobInfo(response.jobProfile);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchMessages();
    fetchUserProfile();

    const pusher = new Pusher("052e95b6508db9070fc0", {
      cluster: "eu",
      authEndpoint: "https://nexusmain.onrender.com/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    });

    const channel = pusher.subscribe("chat." + chatId);

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Subscription to channel succeeded");
    });

    channel.bind("pusher:subscription_error", (status) => {
      console.log("Subscription to channel failed:", status);
    });

    channel.bind("App\\Events\\MessageSent", (data) => {
      if (
        data.message.user_id === userId ||
        sentMessageIds.current.has(data.message.id)
      ) {
        return;
      }

      const newMessage = {
        _id: data.message.id,
        text: data.message.message,
        createdAt: new Date(data.message.created_at),
        user: {
          _id: data.message.user_id,
          name: data.message.user.name,
          avatar: data.message.user.avatar,
        },
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatId, userToken, userId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMessageObj = {
      _id: Date.now(),
      text: newMessage,
      createdAt: new Date(),
      user: {
        _id: userId,
        name: loggedInUserJobInfo.name,
        avatar: loggedInUserJobInfo.avatar,
      },
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    sentMessageIds.current.add(newMessageObj._id);
    setNewMessage("");

    try {
      await messageService.sendMessage(chatId, newMessageObj.text);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.user._id === userId ? "sent" : "received"
            }`}
          >
            <img
              src={message.user.avatar}
              alt={message.user.name}
              className="avatar"
            />
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <span className="message-timestamp">
                {message.createdAt.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
