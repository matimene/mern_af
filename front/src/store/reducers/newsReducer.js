import {
  CREATE_NEWS,
  DELETE_NEWS,
  FETCH_NEWS,
  TOGGLE_NEWS,
} from "../actions/newsActions";

const initialState = {
  news: [],
  archivedNews: [],
  total: 0,
  params: { page: 1, perPage: 10, isArchived: false },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: action.payload.news,
        total: action.payload.total,
        params: action.payload.params,
      };
    case CREATE_NEWS:
      return {
        ...state,
        news: [action.payload, ...state.news],
        total: state.total + 1,
      };
    case TOGGLE_NEWS:
      return {
        ...state,
        news: state.news.filter((news) => news.id !== action.payload),
        total: state.total - 1,
      };
    case DELETE_NEWS:
      return {
        ...state,
        news: state.news.filter((news) => news.id !== action.payload),
        total: state.total - 1,
      };
    default:
      return state;
  }
};

export default reducer;
