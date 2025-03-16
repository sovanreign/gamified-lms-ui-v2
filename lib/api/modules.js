import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchModules = async () => {
  const response = await axios.get(`${API_URL}/api/modules`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const updateModule = async ({ moduleId, data }) => {
  const response = await axios.patch(
    `${API_URL}/api/modules/${moduleId}`,
    data,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
