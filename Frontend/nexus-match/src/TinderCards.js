import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import userService from "./services/userService";
import authService from "./services/authService";
import swipeService from "./services/swipeService";
import "./TinderCards.css";

function TinderCards() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        console.log("Fetched users:", response);
        setUsers(response);
        setCurrentIndex(response.length - 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = async (direction, userId) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await swipeService.swipeJob(user.id, userId, direction);
      if (direction === "right") {
        const isMatch = await swipeService.checkMatch(user.id, userId);
        if (isMatch) {
          alert("Match!");
        }
      }
      updateCurrentIndex(currentIndex - 1);
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      const userId = users[currentIndex].id;
      await swiped(dir, userId);
    }
  };

  return (
    <div>
      <h1>Match Cards</h1>
      <div className="tinderCards__cardContainer">
        {users.map((user, index) => (
          <TinderCard
            className="swipe"
            key={user.id}
            onSwipe={(dir) => swiped(dir, user.id)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(${
                  user.avatarJob
                    ? `https://nexusmain.onrender.com/storage/avatars/${user.avatarJob}`
                    : "default_image_url"
                })`,
              }}
              className="card"
            >
              <h3>{user.name}</h3>
              <p>{user.descriptionJob}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>Dislike</button>
        <button onClick={() => swipe("right")}>Like</button>
      </div>
    </div>
  );
}

export default TinderCards;
