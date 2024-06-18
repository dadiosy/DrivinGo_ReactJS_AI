import { PROCESS } from '../../utils/enums';
import * as ActionTypes from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  process: PROCESS.SELECT_CATEGORY,
  category: [],
  products: []
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORY_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.SET_CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        category: action.payload
      }
    }
    case ActionTypes.SET_CATEGORY_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case ActionTypes.SET_CURRENT_CATEGORY_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.SET_CURRENT_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        products: action.payload
      }
    }
    case ActionTypes.SET_CURRENT_CATEGORY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case ActionTypes.GO_TO_CATEGORY_SELECT_PROCESS: {
      return {
        ...state,
        process: PROCESS.SELECT_CATEGORY
      }
    }
    case ActionTypes.GO_TO_PRODUCT_SELECT_PROCESS: {
      return {
        ...state,
        process: PROCESS.SELECT_PRODUCT
      }
    }
    case ActionTypes.GO_TO_SIZE_SELECT_PROCESS: {
      return {
        ...state,
        process: PROCESS.SELECT_SIZE
      }
    }
    case ActionTypes.GO_TO_COUNT_SELECT_PROCESS: {
      return {
        ...state,
        process: PROCESS.SELECT_COUNT
      }
    }
    case ActionTypes.GO_TO_CATEGORY_CONFIRM_PROCESS: {
      return {
        ...state,
        process: PROCESS.CONFIRM_CATEGORY
      }
    }
    case ActionTypes.GO_TO_PRODUCT_CONFIRM_PROCESS: {
      return {
        ...state,
        process: PROCESS.CONFIRM_PRODUCT
      }
    }
    case ActionTypes.GO_TO_ORDER_CONFIRM_PROCESS: {
      return {
        ...state,
        process: PROCESS.CONFIRM_ORDER
      }
    }
    
    default: {
      return state;
    }
  }
}

export default category;