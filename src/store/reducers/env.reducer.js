import * as ActionTypes from '../constants';
import { languageConfig } from '../../utils/config';

const initialState = {
  language: languageConfig[0]
}

const environment = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language
      }
    }
    default: {
      return state;
    }
  }
}

export default environment;