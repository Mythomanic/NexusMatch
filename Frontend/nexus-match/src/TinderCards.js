import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import userService from "./services/userService";
import authService from "./services/authService";
import swipeService from "./services/swipeService";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  background-image: ${(props) => `url(${props.backgroundImage})`};
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h3`
  margin: 0;
  color: #37657f;
`;

const Description = styled.p`
  margin: 5px 0;
  color: #5f757f;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#7EB0CC")};
  color: white;
`;

function TinderCards() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        console.log("Fetched users:", response);
        setUsers(response);
        setCurrentIndex(response.length - 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = async (direction, userId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await swipeService.swipeJob(user.id, userId, direction);
      if (direction === "right") {
        const isMatch = await swipeService.checkMatch(user.id, userId);
        if (isMatch) {
          alert("Match!");
        }
      }
      updateCurrentIndex(currentIndex - 1);
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      const userId = users[currentIndex].id;
      await swiped(dir, userId);
    }
  };

  return (
    <Container>
      <h1 style={{ color: "#37657F" }}>Match Cards</h1>
      <CardContainer>
        {users.map((user, index) => (
          <TinderCard
            className="swipe"
            key={user.id}
            onSwipe={(dir) => swiped(dir, user.id)}
            preventSwipe={["up", "down"]}
          >
            <Card
              backgroundImage={
                user.avatarJob
                  ? `https://nexusmain.onrender.com/storage/avatars/${user.avatarJob}`
                  : "default_image_url"
              }
            >
              <CardContent>
                <Title>{user.name}</Title>
                <Description>{user.descriptionJob}</Description>
              </CardContent>
            </Card>
          </TinderCard>
        ))}
      </CardContainer>
      <Buttons>
        <Button danger onClick={() => swipe("left")}>
          Dislike
        </Button>
        <Button onClick={() => swipe("right")}>Like</Button>
      </Buttons>
    </Container>
  );
}

export default TinderCards;
