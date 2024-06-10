/* import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const getJobs = async () => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.get(API_URL + "jobs", { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

const getJobById = async (id) => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.get(API_URL + `jobs/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching job by id:", error);
        throw error;
    }
};

const createJob = async (jobData) => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.post(API_URL + "jobs", jobData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
};

const updateJob = async (id, jobData) => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.put(API_URL + `jobs/${id}`, jobData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
};

const deleteJob = async (id) => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.delete(API_URL + `jobs/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error deleting job:", error);
        throw error;
    }
};

const getJobsByUser = async (userId) => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.get(`${API_URL}user/${userId}/jobs`, { headers });
        return response.data.jobs;
    } catch (error) {
        console.error("Error fetching jobs by user:", error);
        throw error;
    }
};

const getLikedUsers = async (jobId) => {
    const headers = await authService.authHeader();
    try {
        const response = await axios.get(`${API_URL}job/${jobId}/likes`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching liked users:", error);
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
}; */