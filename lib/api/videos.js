import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const createVideo = async (data) => {
  const response = await axios.post(`${API_URL}/api/videos`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const fetchVideos = async ({ queryKey }) => {
  const [, search] = queryKey;
  const response = await axios.get(`${API_URL}/api/videos`, {
    params: { q: search || "" },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchVideoById = async (videoId) => {
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/videos/${videoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateVideo = async ({ videoId, data }) => {
  if (!token) throw new Error("No token found");

  const response = await axios.patch(`${API_URL}/api/videos/${videoId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteVideo = async (videoId) => {
  await axios.delete(`${API_URL}/api/videos/${videoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
