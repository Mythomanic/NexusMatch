import React, { useState, useEffect } from "react";
import jobService from "../services/jobService";
import authService from "../services/authService";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const JobCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  background-color: #7eb0cc;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const JobCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const JobTitle = styled(Card.Title)`
  font-size: 1.5em;
  color: #37657f;
`;

const JobText = styled(Card.Text)`
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

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No current user found");
          return;
        }

        const response = await jobService.getJobsByUser(user.id);
        setJobs(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        console.error("Error details:", error.response?.data);
      }
    };

    fetchJobs();
  }, []);

  const handleViewApplicants = (jobId) => {
    navigate(`/applicants/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <JobsContainer>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.id}>
            <JobCardBody>
              <JobTitle>Company Name: {job.title}</JobTitle>
              <JobText>Job Description: {job.description}</JobText>
              <JobText>Location: {job.location}</JobText>
              <JobText>Salary: {job.salary}</JobText>
              <ButtonContainer>
                <StyledButton onClick={() => handleViewApplicants(job.id)}>
                  See The Applicants
                </StyledButton>
                <DeleteButton onClick={() => handleDeleteJob(job.id)}>
                  Delete This Job
                </DeleteButton>
              </ButtonContainer>
            </JobCardBody>
          </JobCard>
        ))
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </JobsContainer>
  );
}

export default MyJobs;
