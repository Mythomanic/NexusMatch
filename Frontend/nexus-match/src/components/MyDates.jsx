import React, { useState, useEffect } from "react";
import dateService from "../services/dateService";
import authService from "../services/authService";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(to right, #ffffff, #e6f0f5);
`;

const DateCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  background-color: #7eb0cc;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DateCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateTitle = styled(Card.Title)`
  font-size: 1.5em;
  color: #37657f;
`;

const DateText = styled(Card.Text)`
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

function MyDates() {
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No current user found");
          return;
        }

        const response = await dateService.getUserDates(user.id);
        if (response.status && Array.isArray(response.dates)) {
          setDates(response.dates);
        } else {
          console.error("Response is not in expected format:", response);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, []);

  const handleDeleteDate = async (dateId) => {
    try {
      await dateService.deleteDate(dateId);
      setDates(dates.filter((date) => date.id !== dateId));
    } catch (error) {
      console.error("Error deleting date:", error);
    }
  };

  const handleViewApplicants = (dateId) => {
    navigate(`/date-applicants/${dateId}`);
  };

  return (
    <DatesContainer>
      {dates.length > 0 ? (
        dates.map((date) => (
          <DateCard key={date.id}>
            <DateCardBody>
              <DateTitle>{date.title}</DateTitle>
              <DateText>Description: {date.description}</DateText>
              <DateText>Location: {date.location}</DateText>
              <DateText>Your Gender: {date.ownGender}</DateText>
              <DateText>Desired Gender: {date.desiredGender}</DateText>
              <ButtonContainer>
                <StyledButton onClick={() => handleViewApplicants(date.id)}>
                  See The Applicants
                </StyledButton>
                <DeleteButton onClick={() => handleDeleteDate(date.id)}>
                  Delete This Date
                </DeleteButton>
              </ButtonContainer>
            </DateCardBody>
          </DateCard>
        ))
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </DatesContainer>
  );
}

export default MyDates;
