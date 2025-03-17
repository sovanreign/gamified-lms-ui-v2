import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllAnnouncements = async () => {
  const response = await axios.get(`${API_URL}/api/announcements`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const createAnnouncement = async (data) => {
  const response = await axios.post(`${API_URL}/api/announcements`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const updateAnnouncement = async (id, data) => {
  const response = await axios.patch(
    `${API_URL}/api/announcements/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

export const deleteAnnouncement = async (id) => {
  await axios.delete(`${API_URL}/api/announcements/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
