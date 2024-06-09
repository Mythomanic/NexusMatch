import React, { useState, useEffect } from "react";
import jobService from "../services/jobService";
import authService from "../services/authService";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div>
      <h1>My Jobs</h1>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}

export default MyJobs;
