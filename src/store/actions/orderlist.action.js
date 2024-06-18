import * as ActionTypes from '../constants';

export const addOrder = (order) => {
  const price = order.price[order.size] * order.count;

  return {
    type: ActionTypes.ADD_ORDER_LIST,
    payload: {
      order,
      price
    }
  }
}

export const endOrder = () => {
  return { type: ActionTypes.FINISH_ORDER }
}