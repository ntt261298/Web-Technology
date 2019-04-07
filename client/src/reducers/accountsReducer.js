import { VERIFY_TOKEN, USER_LOGIN, USER_SIGNUP, USER_LOGOUT, USER_HISTORY, USER_INFOR, USER_UPDATE, SEND_MAIL, RESET_PASSWORD } from '../actions/types.js';
import { saveState } from '../helpers/localStorage';

const initialState = {
  token: '',
  signupErr: '',
  loginErr: '',
  history: [],
  resetErr: '',
  emailErr: '',
  name: '',
  infor: [],
  updateErr: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFY_TOKEN:
      return {
        ...state,
        token: action.payload,
        name: action.name
      };
    case USER_LOGIN: {
      if(!action.payload.success)
        return {
          ...state,
          loginErr: action.payload.message
        };
      else {
        saveState(action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          loginErr: action.payload.message
        }
      }
    }
    case USER_SIGNUP:
      if(!action.payload.success)
        return {
          ...state,
          signupErr: action.payload.message
        };
    case USER_LOGOUT:
        return {
          ...state,
          token: '',
          loginErr: '',
          signupErr: ''
        };
    case USER_HISTORY:
        return {
          ...state,
          history: action.payload
        };
    case USER_INFOR:
        return {
          ...state,
          infor: action.payload,
          updateErr: ''
        };
    case USER_UPDATE:
        if(!action.payload.success)
          return {
            ...state,
            updateErr: action.payload.message
          };
        return {
          ...state,
          infor: action.payload,
          updateErr: action.payload.message
        };
    case RESET_PASSWORD:
        return {
          ...state,
          resetErr: action.payload.resetErr
        };
    case SEND_MAIL:
        return {
          ...state,
          emailErr: action.payload.message
        };
    default:
      return state;
  }
}
