import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import environment from "./reducers/env.reducer";
import auth from './reducers/auth.reducer';
import category from './reducers/category.reducer';
import orderlist from "./reducers/orderlist.reducer";

const rootReducer = combineReducers({
  environment,
  auth,
  category,
  orderlist
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;