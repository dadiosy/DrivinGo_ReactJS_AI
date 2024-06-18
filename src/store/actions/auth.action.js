import * as ActionsType from '../constants';

export const loginUser = () => {
  return {
    type: ActionsType.USER_LOGIN,
    payload: {
      isLogged: true
    }
  }
}