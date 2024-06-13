import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import dateService from "../services/dateService";
import authService from "../services/authService";
import styled, { css } from "styled-components";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

const Container = styled.div`
  text-align: center;
  background: linear-gradient(135deg, #37657f 0%, #5f757f 100%);
  min-height: 100vh;
  padding: 20px 0;
  transition: background-color 0.5s ease;
  ${({ swipedirection }) =>
    swipedirection === "like" &&
    css`
      background-color: rgba(46, 204, 113, 0.2);
    `}
  ${({ swipedirection }) =>
    swipedirection === "dislike" &&
    css`
      background-color: rgba(231, 76, 60, 0.2);
    `}
`;

const CardContainer = styled.div`
  position: relative;
  width: 600px;
  max-width: 85vw;
  height: 60vh;
  margin: 20px auto;
`;

const Card = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #5c6373;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: black;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  color: white;
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Detail = styled.p`
  margin: 5px 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.danger ? "#c0392b" : "#27ae60")};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: white;
  font-size: 1.2em;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  width: 600px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

function DateCards() {
  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDates, setFilteredDates] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No user logged in");
          return;
        }
        console.log("Fetching unseen dates for user ID:", user.id);
        const response = await dateService.getUnseenDates(user.id);
        console.log("getUnseenDates response:", response); // Log the dates for debugging
        if (response && Array.isArray(response)) {
          setDates(response);
          setFilteredDates(response);
          setCurrentIndex(response.length - 1);
        } else {
          console.error("Response is not an array:", response);
          setDates([]);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
        setDates([]);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    const results = dates.filter(
      (date) =>
        date.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        date.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        date.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDates(results);
    setCurrentIndex(results.length - 1);
  }, [searchTerm, dates]);

  const swiped = async (direction, dateId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await dateService.swipeDate(user.id, dateId, direction);
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      setSwipeDirection(dir);
      const dateId = filteredDates[currentIndex].id;
      await swiped(dir, dateId);
      setTimeout(() => {
        setFilteredDates((prevDates) =>
          prevDates.filter((_, index) => index !== currentIndex)
        );
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setSwipeDirection("");
      }, 300);

      setTimeout(() => {
        setSwipeDirection("");
      }, 500); // Background color reset delay
    }
  };

  return (
    <Container swipedirection={swipeDirection}>
      <SearchInput
        type="text"
        placeholder="Search dates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CardContainer>
        {filteredDates && filteredDates.length > 0 ? (
          filteredDates.map((date, index) => (
            <TinderCard
              className={`swipe ${
                index === currentIndex ? swipeDirection : ""
              }`}
              key={date.id}
              onSwipe={(dir) => swiped(dir, date.id)}
              preventSwipe={["up", "down"]}
            >
              <Card
                backgroundImage={date.imageUrl || "default_image_url"}
                style={{ zIndex: filteredDates.length - index }}
              >
                <CardContent>
                  <Title>{date.title}</Title>
                  <Detail>{date.description}</Detail>
                  <Detail>{date.location}</Detail>
                  <Detail>Your Gender: {date.ownGender}</Detail>
                  <Detail>Desired Gender: {date.desiredGender}</Detail>
                </CardContent>
                <Buttons>
                  <Button danger onClick={() => swipe("dislike")}>
                    <ThumbDown style={{ marginRight: 8 }} />
                    Dislike
                  </Button>
                  <Button onClick={() => swipe("like")}>
                    <ThumbUp style={{ marginRight: 8 }} />
                    Like
                  </Button>
                </Buttons>
              </Card>
            </TinderCard>
          ))
        ) : (
          <EmptyState>No dates available</EmptyState>
        )}
      </CardContainer>
    </Container>
  );
}

export default DateCards;
