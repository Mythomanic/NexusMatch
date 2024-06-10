import React, { useState, useEffect } from "react";
import jobService from "../services/jobService";
import authService from "../services/authService";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

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
        console.log("asdasdadas", user.id);
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

  return (
    <div className="jobs">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="myJobs d-flex">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Company Name: {job.title}</Card.Title>
                <Card.Text>Job Description: {job.description}</Card.Text>
                <Card.Text>Location: {job.location}</Card.Text>
                <Card.Text>Salary: {job.salary}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewApplicants(job.id)}
                >
                  See The Applicants
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default MyJobs;
