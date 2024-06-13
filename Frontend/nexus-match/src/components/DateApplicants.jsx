import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import dateService from "../services/dateService";
import authService from "../services/authService";
import chatService from "../services/chatService";
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
  background-color: #f5f5f5;
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

function DateApplicants() {
  const { dateId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await dateService.getLikedUsers(dateId);
        setApplicants(response.likedUsers);
        setCurrentIndex(response.likedUsers.length - 1);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [dateId]);

  const swiped = async (direction, applicantId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      if (direction === "like") {
        await chatService.createChat(applicantId);
        alert("Match! Chat created.");
      }
      await dateService.moveUserFromLikesToDislikes(dateId, applicantId);
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      const applicantId = applicants[currentIndex].id;
      await swiped(dir, applicantId);
      setApplicants((prevApplicants) =>
        prevApplicants.filter((_, index) => index !== currentIndex)
      );
      setCurrentIndex((prevIndex) => prevIndex - prevIndex);
    }
  };

  return (
    <Container>
      <h1 style={{ color: "#37657F" }}>Bu date'e başvuranlar</h1>
      <CardContainer>
        {applicants.map((applicant, index) => (
          <TinderCard
            className="swipe"
            key={applicant.id}
            onSwipe={(dir) => swiped(dir, applicant.id)}
            preventSwipe={["up", "down"]}
          >
            <Card
              backgroundImage={
                applicant.avatarDate
                  ? `https://nexusmain.onrender.com/storage/avatars/${applicant.avatarDate}`
                  : "default_image_url"
              }
            >
              <CardContent>
                <Title>{applicant.name}</Title>
                <Description>{applicant.descriptionDate}</Description>
              </CardContent>
              <Buttons>
                <Button danger onClick={() => swipe("dislike")}>
                  Dislike
                </Button>
                <Button onClick={() => swipe("like")}>Like</Button>
              </Buttons>
            </Card>
          </TinderCard>
        ))}
      </CardContainer>
    </Container>
  );
}

export default DateApplicants;
