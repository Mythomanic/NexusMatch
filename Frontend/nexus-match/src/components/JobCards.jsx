import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import jobService from "../services/jobService";
import authService from "../services/authService";
import swipeService from "../services/swipeService";
import "../TinderCards.css";

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
    <div className="job-cards-container">
      <h1 className="title">Job Opportunities</h1>
      <div className="tinderCards__cardContainer">
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
              <div
                style={{
                  backgroundImage: `url(${
                    job.imageUrl || "default_image_url"
                  })`,
                }}
                className="card"
              >
                <div className="card-content">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-description">{job.description}</p>
                  <p className="job-location">{job.location}</p>
                </div>
                <div className="buttons">
                  <button
                    className="btn btn-danger"
                    onClick={() => swipe("dislike")}
                  >
                    Dislike
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => swipe("like")}
                  >
                    Like
                  </button>
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <p className="no-jobs">No jobs available</p>
        )}
      </div>
    </div>
  );
}

export default JobCards;
