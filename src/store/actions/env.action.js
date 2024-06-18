import * as ActionTypes from '../constants';

export const setLanguage = (language) => {
  return {
    type: ActionTypes.SET_LANGUAGE,
    payload: { language }
  }
}