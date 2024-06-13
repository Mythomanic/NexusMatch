import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api";

const getJobs = async () => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/jobs`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

const getJobById = async (id) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching job by id:", error);
    throw error;
  }
};

const createJob = async (jobData) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

const updateJob = async (id, jobData) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(`${API_URL}/jobs/${id}`, jobData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

const deleteJob = async (jobId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.delete(`${API_URL}/jobs/${jobId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

const getJobsByUser = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/jobs`, {
      headers,
    });
    return response.data.jobs; 
  } catch (error) {
    console.error("Error fetching jobs by user:", error);
    throw error;
  }
};

const getLikedUsers = async (jobId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/job/${jobId}/likes`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked users:", error);
    throw error;
  }
};

const moveUserFromLikesToDislikes = async (jobId, userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/move-user/${userId}`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error moving user from likes to dislikes:", error);
    throw error;
  }
};

const getUnseenJobs = async (userId) => {
  const headers = authService.authHeader();
  try {
    console.log(`Fetching unseen jobs for user ID: ${userId}`);
    const response = await axios.get(
      `${API_URL}/user/${userId}/jobOpportunities`,
      {
        headers,
      }
    );
    console.log("API response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching unseen jobs:", error);
    throw error;
  }
};

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByUser,
  getLikedUsers,
  moveUserFromLikesToDislikes,
  getUnseenJobs,
};
