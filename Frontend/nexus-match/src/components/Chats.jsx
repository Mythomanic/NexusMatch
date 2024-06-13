import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import authService from "../services/authService";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChatBubbleOutline } from "@mui/icons-material";

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #7eb0cc 0%, #bef8ff 100%);
  min-height: 100vh;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

const ChatBox = styled.div`
  background: #f0f4f8;
  border: 1px solid #37657f;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const ChatLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  text-decoration: none;
  color: #37657f;
  transition: color 0.3s ease;

  &:hover {
    color: #256dd9;
  }

  svg {
    margin-right: 10px;
  }
`;

const NoChatsMessage = styled.p`
  font-size: 1.2em;
  color: #5f757f;
`;

const Title = styled.h2`
  color: #37657f;
  margin-bottom: 20px;
  font-size: 1.5em;
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
      <Title>Your Matches and Chats</Title>
      <ChatList>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatBox key={chat.id}>
              <ChatLink to={`/chat/${chat.id}`}>
                <ChatBubbleOutline />
                Chat with{" "}
                {chat.user1_id === authService.getCurrentUser().id
                  ? chat.user2.name
                  : chat.user1.name}
              </ChatLink>
            </ChatBox>
          ))
        ) : (
          <NoChatsMessage>No chats available</NoChatsMessage>
        )}
      </ChatList>
    </Container>
  );
}

export default Chats;
