import { SET_PATIENT, PATIENT, LOGOUT } from '../constants';

export const AUTH_INITIAL_STATE = {
  token: null,
  mp: null
};

export const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PATIENT: {
      localStorage.setItem(PATIENT, JSON.stringify(action.payload));
      return {
        ...state,
        token: action.payload.token
      };
    }

    case LOGOUT: {
      localStorage.setItem(PATIENT, JSON.stringify(AUTH_INITIAL_STATE));
      return AUTH_INITIAL_STATE;
    }

    default:
      return state;
  }
};
