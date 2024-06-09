import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import jobService from "../services/jobService";
import authService from "../services/authService";
import swipeService from "../services/swipeService";
import "../TinderCards.css";

function JobCards() {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getJobs();
        setJobs(response);
        setCurrentIndex(response.length - 1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const swiped = async (direction, jobId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await swipeService.swipeJob(user.id, jobId, direction);
      if (direction === "like") {
        const isMatch = await swipeService.checkMatch(user.id, jobId);
        if (isMatch) {
          alert("Match!");
        }
      }
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      const jobId = jobs[currentIndex].id;
      await swiped(dir, jobId);
      setJobs((prevJobs) =>
        prevJobs.filter((_, index) => index !== currentIndex)
      );
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div>
      <h1>Job Cards</h1>
      <div className="tinderCards__cardContainer">
        {jobs.map((job, index) => (
          <TinderCard
            className="swipe"
            key={job.id}
            onSwipe={(dir) => swiped(dir, job.id)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(${job.imageUrl || "default_image_url"})`,
              }}
              className="card"
            >
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>{job.location}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "end" }} className="buttons">
        <button onClick={() => swipe("dislike")}>Dislike</button>
        <button onClick={() => swipe("like")}>Like</button>
      </div>
    </div>
  );
}

export default JobCards;
