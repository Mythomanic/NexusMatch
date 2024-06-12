import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import authService from "../services/authService";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ChatLink = styled(Link)`
  font-size: 1.2em;
  text-decoration: none;
  color: #256dd9;

  &:hover {
    color: #25a6d9;
  }
`;

const NoChatsMessage = styled.p`
  font-size: 1.2em;
  color: #9cb5db;
`;

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
        if (response && response.chats) {
          setChats(response.chats);
        } else {
          console.error("No chats received.");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <Container>
      <h1>You matched with these people, your chats:</h1>
      <ChatList>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatLink key={chat.id} to={`/chat/${chat.id}`}>
              Chat with{" "}
              {chat.user1_id === authService.getCurrentUser().id
                ? chat.user2.name
                : chat.user1.name}
            </ChatLink>
          ))
        ) : (
          <NoChatsMessage>No chats available</NoChatsMessage>
        )}
      </ChatList>
    </Container>
  );
}

export default Chats;
