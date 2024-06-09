import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import userService from "../services/userService";
import authService from "../services/authService";
import swipeService from "../services/swipeService";
import "../TinderCards.css";

function UserCards() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response);
        setCurrentIndex(response.length - 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0) {
      const userId = users[currentIndex].id;
      await swiped(dir, userId);
      setUsers((prevUsers) =>
        prevUsers.filter((_, index) => index !== currentIndex)
      );
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div>
      <h1>User Cards</h1>
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

export default UserCards;
