import axios from "axios";
import { getConfigObj } from "../utils";

const baseUrl = "/api/news";

const getNews = async ({ page, perPage, isArchived }) => {
  const response = await axios.get(baseUrl, {
    params: {
      page,
      perPage,
      isArchived,
    },
  });
  return response.data;
};

const getOneNews = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNews = async (news) => {
  const response = await axios.post(baseUrl, news, getConfigObj());
  return response.data;
};

const toggleArchiveNews = async (news) => {
  const response = await axios.put(
    `${baseUrl}/toggle/${news.id}`,
    {},
    getConfigObj()
  );
  return response.data;
};

const updateNews = async (news) => {
  const response = await axios.put(
    `${baseUrl}/toggle/${news.id}`,
    news,
    getConfigObj()
  );
  return response.data;
};

const deleteNews = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfigObj());
  return response.data;
};

export {
  getNews,
  getOneNews,
  updateNews,
  createNews,
  toggleArchiveNews,
  deleteNews,
};
