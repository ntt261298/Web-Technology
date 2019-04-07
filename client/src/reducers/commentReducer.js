import { GET_COMMENT, ADD_COMMENT } from '../actions/types';

const initialState = {
  comment: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case ADD_COMMENT: {
      return {
        ...state,
        comment: [action.payload, ...state.comment]
      };
    }
    default:
      return state;
  }
}
