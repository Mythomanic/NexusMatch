import React, { useState, useEffect } from "react";
import eventService from "../services/eventService";
import authService from "../services/authService";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const EventCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  background-color: #7eb0cc;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EventCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventTitle = styled(Card.Title)`
  font-size: 1.5em;
  color: #37657f;
`;

const EventText = styled(Card.Text)`
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  background-color: #37657f;
  border: none;
  &:hover {
    background-color: #2534d9;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #d92525;
  border: none;
  &:hover {
    background-color: #d9534f;
  }
`;

function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No current user found");
          return;
        }

        const response = await eventService.getEventsByUser(user.id);
        setEvents(response);
      } catch (error) {
        console.error("Error fetching events:", error);
        console.error("Error details:", error.response?.data);
      }
    };

    fetchEvents();
  }, []);

  const handleViewApplicants = (eventId) => {
    navigate(`/event-applicants/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await eventService.deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <EventsContainer>
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id}>
            <EventCardBody>
              <EventTitle>Event Title: {event.title}</EventTitle>
              <EventText>Event Description: {event.description}</EventText>
              <EventText>Location: {event.location}</EventText>
              <EventText>Date: {event.date}</EventText>
              <ButtonContainer>
                <StyledButton onClick={() => handleViewApplicants(event.id)}>
                  See The Applicants
                </StyledButton>
                <DeleteButton onClick={() => handleDeleteEvent(event.id)}>
                  Delete This Event
                </DeleteButton>
              </ButtonContainer>
            </EventCardBody>
          </EventCard>
        ))
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </EventsContainer>
  );
}

export default MyEvents;
