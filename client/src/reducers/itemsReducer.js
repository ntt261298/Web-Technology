import { SET_LOADING, TOGGLE_LOGIN, TOGGLE_FORGET } from '../actions/types';

const initialState = {
  loading: false,
  modal: false,
  forgetModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return {
        ...state,
        modal: !state.modal
      }
    case TOGGLE_FORGET:
      return {
        ...state,
        forgetModal: !state.forgetModal
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
