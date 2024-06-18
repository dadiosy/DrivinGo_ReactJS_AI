import axios from "axios";
import '../mockApi';
import { assignHandGestures } from "../../utils/functions";
import * as ActionTypes from '../constants';

export const getCategoryList = (lang) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_CATEGORY_LIST_REQUEST });

  return axios.get(`/api/category?lang=${lang.name}`)
    .then(response => {
      const data = assignHandGestures(response.data);

      dispatch({
        type: ActionTypes.SET_CATEGORY_LIST_SUCCESS,
        payload: data
      });

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.SET_CATEGORY_LIST_FAILURE,
        error
      });

      return error;
    });
}

export const getCategoryById = (lang, id) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_CURRENT_CATEGORY_REQUEST });

  return axios.get(`/api/category?lang=${lang.name}&id=${id}`)
    .then(response => {
      const data = assignHandGestures(response.data);

      dispatch({
        type: ActionTypes.SET_CURRENT_CATEGORY_SUCCESS,
        payload: data
      });

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.SET_CURRENT_CATEGORY_FAILURE,
        error
      });

      return error;
    })
}

export const setCategorySelectProcess = () => {
  return { type: ActionTypes.GO_TO_CATEGORY_SELECT_PROCESS }
}

export const setProductSelectProcess = () => {
  return { type: ActionTypes.GO_TO_PRODUCT_SELECT_PROCESS }
}

export const setSizeSelectProcess = () => {
  return { type: ActionTypes.GO_TO_SIZE_SELECT_PROCESS };
}

export const setCountSelectProcess = () => {
  return { type: ActionTypes.GO_TO_COUNT_SELECT_PROCESS };
}

export const setCategoryConfirmProcess = () => {
  return { type: ActionTypes.GO_TO_CATEGORY_CONFIRM_PROCESS };
}

export const setProductConfirmProcess = () => {
  return { type: ActionTypes.GO_TO_PRODUCT_CONFIRM_PROCESS };
}

export const setOrderConfirmProcess = () => {
  return { type: ActionTypes.GO_TO_ORDER_CONFIRM_PROCESS };
}