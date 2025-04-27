import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
// Event-related API functions
export const getEvents = async (params = {}) => {
  try {
    const response = await api.get("/events/", { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getEvent = async (id: number) => {
  try {
    const response = await api.get(`/events/${id}/`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getEventTypes = async () => {
  try {
    const response = await api.get("/events/types/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getEventTopics = async () => {
  try {
    const response = await api.get("/events/topics/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getFeaturedEvents = async () => {
  try {
    const response = await api.get("/events/featured/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const apiGetPastEvents = async () => {
  try {
    const response = await api.get("/events/past/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const apiGetUpcomingEvents = async () => {
  try {
    const response = await api.get("/events/upcoming/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default api;
