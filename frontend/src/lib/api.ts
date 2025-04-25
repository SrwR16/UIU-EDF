import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getNotices = async () => {
  try {
    const response = await api.get("/notices/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getNoticesByCategory = async (categoryId: number) => {
  try {
    const response = await api.get(`/notices/categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("/categories/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default api;
