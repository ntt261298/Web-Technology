import { SEARCH_BOOK, SEARCH_CATE } from '../actions/types';

const initialState = {
  results: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOOK:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
}
