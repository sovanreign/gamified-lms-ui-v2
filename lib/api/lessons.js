import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchLessons = async ({ queryKey }) => {
  const token = localStorage.getItem("token");

  const [, moduleId] = queryKey; // Extract moduleId from queryKey
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/lessons`, {
    params: moduleId ? { moduleId } : {}, // Add moduleId if available
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchLessonById = async (lessonId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/lessons/${lessonId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateLesson = async ({ lessonId, data }) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API_URL}/api/lessons/${lessonId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const markLessonAsDone = async ({ studentId, lessonId }) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/api/lessons/mark-as-done`,
    {
      studentId,
      lessonId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
