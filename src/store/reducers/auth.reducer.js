import * as ActionsType from '../constants';

const initialState = {
  isLogged: false
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.USER_LOGIN: {
      return {
        ...state,
        isLogged: action.payload.isLogged
      }
    }
    default: {
      return state;
    }
  }
}

export default login