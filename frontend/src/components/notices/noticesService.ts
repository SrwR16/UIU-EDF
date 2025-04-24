import { getCategories as apiGetCategories, getNotices as apiGetNotices } from "../../lib/api";

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  image?: string;
  attachments?: {
    name: string;
    url: string;
  }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiGetCategories();
    return [{ id: "all", name: "All Notices", slug: "all" }, ...response.results];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getNotices = async (categoryId?: string): Promise<Notice[]> => {
  try {
    const params: { category?: string } = {};
    if (categoryId && categoryId !== "all") {
      params.category = categoryId;
    }

    const response = await apiGetNotices(params);
    return response.results;
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};
