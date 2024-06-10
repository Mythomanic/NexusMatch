import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import authService from "../services/authService";
import { Link } from "react-router-dom";

function Chats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No current user found");
          return;
        }

        const response = await chatService.fetchChats();
        setChats(response.chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      <h1>Chats</h1>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div key={chat.id}>
            <Link to={`/chat/${chat.id}`}>
              Chat with{" "}
              {chat.user1_id === authService.getCurrentUser().id
                ? chat.user2.name
                : chat.user1.name}
            </Link>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
}

export default Chats;
