import { SET_LOADING, GET_QUESTIONS, GET_QUESTION, GET_CATE } from '../actions/types';

const initialState = {
  quesions: [],
  question: [],
  loading: false,
  cate: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case GET_QUESTION: {
      console.log(action.payload);
      return {
        ...state,
        question: state.question.push(action.payload),
        loading: false
      };
    }
    case GET_CATE:
      return {
        ...state,
        cate: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
