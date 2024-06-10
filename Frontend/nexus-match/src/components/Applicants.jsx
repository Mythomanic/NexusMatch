import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import jobService from "../services/jobService";
import authService from "../services/authService";
import swipeService from "../services/swipeService";
import chatService from "../services/chatService";
import "../TinderCards.css";

function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await jobService.getLikedUsers(jobId);
        setApplicants(response.likedUsers);
        setCurrentIndex(response.likedUsers.length - 1);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const swiped = async (direction, applicantId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      if (direction === "like") {
        await chatService.createChat(applicantId);
        alert("Match! Chat created.");
      } else if (direction === "dislike") {
        await jobService.moveUserFromLikesToDislikes(jobId, applicantId);
      }
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
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div>
      <h1>Applicants</h1>
      <div className="tinderCards__cardContainer">
        {applicants.map((applicant, index) => (
          <TinderCard
            className="swipe"
            key={applicant.id}
            onSwipe={(dir) => swiped(dir, applicant.id)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(${
                  applicant.avatarJob
                    ? `https://nexusmain.onrender.com/storage/avatars/${applicant.avatarJob}`
                    : "default_image_url"
                })`,
              }}
              className="card"
            >
              <h3>{applicant.name}</h3>
              <p>{applicant.descriptionJob}</p>
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
        ))}
      </div>
    </div>
  );
}

export default Applicants;
