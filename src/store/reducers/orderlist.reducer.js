import * as ActionTypes from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  list: [],
  isFinished: false,
  total: 0
}

const orderlist = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.ADD_ORDER_LIST: {
      return {
        ...state,
        list: [
          ...state.list,
          action.payload.order
        ],
        total: state.total + action.payload.price
      }
    }
    case ActionTypes.FINISH_ORDER: {
      return {
        ...initialState,
        isFinished: true
      }
    }
    
    default: {
      return state;
    }
  }
}

export default orderlist;