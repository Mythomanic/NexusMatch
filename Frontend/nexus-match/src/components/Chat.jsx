import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import messageService from "../services/messageService";
import authService from "../services/authService";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 87vh;
`;

const Messages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 10px;
  ${(props) =>
    props.sent ? "justify-content: flex-end;" : "justify-content: flex-start;"}
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.sent ? "#37657F" : "#7EB0CC")};
  color: white;
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;

const MessageText = styled.p`
  margin: 0;
`;

const MessageTimestamp = styled.span`
  font-size: 0.8em;
  color: #ddd;
  align-self: flex-end;
`;

const MessageForm = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f1f1f1;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #2534d9;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #256dd9;
  }
`;

function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userToken = authService.getCurrentUser().token;
  const userId = authService.getCurrentUser().id;
  const [loggedInUserJobInfo, setLoggedInUserJobInfo] = useState({});
  const sentMessageIds = useRef(new Set());
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <Messages>
        {messages.map((message) => (
          <Message key={message._id} sent={message.user._id === userId}>
            <MessageContent sent={message.user._id === userId}>
              <MessageText>{message.text}</MessageText>
              <MessageTimestamp>
                {message.createdAt.toLocaleString()}
              </MessageTimestamp>
            </MessageContent>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </Messages>
      <MessageForm>
        <MessageInput
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </MessageForm>
    </ChatContainer>
  );
}

export default Chat;
