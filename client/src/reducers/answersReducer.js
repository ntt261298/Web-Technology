import { GET_ANSWERS, ADD_ANSWER } from '../actions/types';

const initialState = {
  answer: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ANSWERS: 
      return {
        ...state,
        answer: action.payload,
      };
    case ADD_ANSWER: {
      return {
        ...state,
        answer: [action.payload, ...state.comment]
      };
    }
    default:
      return state;
  }
}
