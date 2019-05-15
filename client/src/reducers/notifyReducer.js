import { GET_NOTIFY, REMOVE_NOTIFY } from '../actions/types';

const initialState = {
  notify: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFY:
      return {
        ...state,
        notify: action.payload
      }
    case REMOVE_NOTIFY:
      return {
          ...state,
          notify: {
              status: false,
          }
      }
    default:
      return state;
  }
}
