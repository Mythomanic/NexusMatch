import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import jobService from "../services/jobService";
import authService from "../services/authService";
import swipeService from "../services/swipeService";
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
  background-color: #f5f5f5;
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
`;

const Description = styled.p`
  margin: 5px 0;
`;

const Location = styled.p`
  margin: 5px 0;
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
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
`;

function JobCards() {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          console.error("No user logged in");
          return;
        }
        console.log("Fetching unseen jobs for user ID:", user.id);
        const response = await jobService.getUnseenJobs(user.id);
        console.log("getUnseenJobs response:", response); // Log the jobs for debugging
        if (response && response.length > 0) {
          setJobs(response);
          setCurrentIndex(response.length - 1);
        } else {
          console.error("No jobs received.");
          setJobs([]); // Eğer iş yoksa, jobları boş bir diziye set et
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Hata durumunda jobları boş bir diziye set et
      }
    };

    fetchJobs();
  }, []);

  const swiped = async (direction, jobId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await swipeService.swipeJob(user.id, jobId, direction);
      // Match kontrolü kaldırıldı
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      setSwipeDirection(dir);
      const jobId = jobs[currentIndex].id;
      await swiped(dir, jobId);
      setTimeout(() => {
        setJobs((prevJobs) =>
          prevJobs.filter((_, index) => index !== currentIndex)
        );
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setSwipeDirection("");
      }, 300); // Animation duration
    }
  };

  return (
    <Container>
      <h1>Job Opportunities</h1>
      <CardContainer>
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <TinderCard
              className={`swipe ${
                index === currentIndex ? swipeDirection : ""
              }`}
              key={job.id}
              onSwipe={(dir) => swiped(dir, job.id)}
              preventSwipe={["up", "down"]}
            >
              <Card backgroundImage={job.imageUrl || "default_image_url"}>
                <CardContent>
                  <Title>{job.title}</Title>
                  <Description>{job.description}</Description>
                  <Location>{job.location}</Location>
                </CardContent>
                <Buttons>
                  <Button danger onClick={() => swipe("dislike")}>
                    Dislike
                  </Button>
                  <Button onClick={() => swipe("like")}>Like</Button>
                </Buttons>
              </Card>
            </TinderCard>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </CardContainer>
    </Container>
  );
}

export default JobCards;
