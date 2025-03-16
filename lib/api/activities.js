import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

export const fetchActivities = async () => {
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/activities`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchActivityById = async (activityId) => {
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/activities/${activityId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateActivity = async ({ activityId, data }) => {
  if (!token) throw new Error("No token found");

  const response = await axios.patch(
    `${API_URL}/api/activities/${activityId}`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};
