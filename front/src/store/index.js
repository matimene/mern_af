import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import newsReducer from "./reducers/newsReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  news: newsReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
