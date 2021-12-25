import { displayErrorMsg, displaySuccessMsg } from "../../utils";
import {
  createNews,
  deleteNews,
  getNews,
  toggleArchiveNews,
} from "../../services";

export const FETCH_NEWS = "FETCH_NEWS";
export const CREATE_NEWS = "CREATE_NEWS";
export const TOGGLE_NEWS = "TOGGLE_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";

export const fetchNews = ({ page, perPage, isArchived }) => {
  return async (dispatch) => {
    try {
      const params = { page, perPage, isArchived };
      const { news, total } = await getNews(params);
      dispatch({
        type: FETCH_NEWS,
        payload: { news, total, params },
      });
    } catch (err) {
      displayErrorMsg(err);
    }
  };
};

export const createNewNews = (news) => {
  return async (dispatch) => {
    try {
      const newNews = await createNews(news);

      displaySuccessMsg("News successfully created", 1500);

      return dispatch({
        type: CREATE_NEWS,
        payload: newNews,
      });
    } catch (err) {
      displayErrorMsg(err);
    }
  };
};

export const toggleNews = (news) => {
  return async (dispatch) => {
    try {
      const updatedNews = await toggleArchiveNews(news);
      displaySuccessMsg("News updated", 1500);

      return dispatch({
        type: TOGGLE_NEWS,
        payload: updatedNews.id,
      });
    } catch (err) {
      if (err.message.includes("401"))
        return displayErrorMsg(
          "Unauthorized: only the user who created the news can archive it"
        );
      displayErrorMsg(err);
    }
  };
};

export const eraseNews = (id) => {
  return async (dispatch) => {
    try {
      await deleteNews(id);
      displaySuccessMsg("News deleted", 1500);

      return dispatch({
        type: DELETE_NEWS,
        payload: id,
      });
    } catch (err) {
      if (err.message.includes("401"))
        return displayErrorMsg(
          "Unauthorized: only the user who created the news can delete it"
        );
      displayErrorMsg(err);
    }
  };
};
