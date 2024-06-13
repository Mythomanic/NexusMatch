import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import eventService from "../services/eventService";
import authService from "../services/authService";
import eventSwipeService from "../services/eventSwipeService";
import styled, { css } from "styled-components";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

const Container = styled.div`
  text-align: center;
  background: linear-gradient(to right, #ffffff, #e6f0f5);
  min-height: 100vh;
  padding: 20px 0;
  transition: background-color 0.5s ease;
  ${({ swipeDirection }) =>
    swipeDirection === "like" &&
    css`
      background-color: rgba(46, 204, 113, 0.2);
    `}
  ${({ swipeDirection }) =>
    swipeDirection === "dislike" &&
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

function EventCards() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No user logged in");
          return;
        }
        console.log("Fetching unseen events for user ID:", user.id);
        const response = await eventService.getUnseenEvents(user.id);
        console.log("getUnseenEvents response:", response); // Log the events for debugging
        if (response && response.length > 0) {
          setEvents(response);
          setFilteredEvents(response);
          setCurrentIndex(response.length - 1);
        } else {
          console.error("No events received.");
          setEvents([]); // Eğer event yoksa, events boş bir diziye set et
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Hata durumunda events boş bir diziye set et
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
    setCurrentIndex(results.length - 1);
  }, [searchTerm, events]);

  const swiped = async (direction, eventId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await eventSwipeService.swipeEvent(user.id, eventId, direction);
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      setSwipeDirection(dir);
      const eventId = filteredEvents[currentIndex].id;
      await swiped(dir, eventId);
      setTimeout(() => {
        setFilteredEvents((prevEvents) =>
          prevEvents.filter((_, index) => index !== currentIndex)
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
    <Container swipeDirection={swipeDirection}>
      <SearchInput
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CardContainer>
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <TinderCard
              className={`swipe ${
                index === currentIndex ? swipeDirection : ""
              }`}
              key={event.id}
              onSwipe={(dir) => swiped(dir, event.id)}
              preventSwipe={["up", "down"]}
            >
              <Card
                backgroundImage={event.imageUrl || "default_image_url"}
                style={{ zIndex: filteredEvents.length - index }}
              >
                <CardContent>
                  <Title>{event.title}</Title>
                  <Detail>{event.description}</Detail>
                  <Detail>{event.location}</Detail>
                  <Detail>{event.date}</Detail>
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
          <EmptyState>No events available</EmptyState>
        )}
      </CardContainer>
    </Container>
  );
}

export default EventCards;
