import { SET_LOADING, GET_BOOKS, GET_BOOK, GET_CATE } from '../actions/types';

const initialState = {
  books: [],
  book: [],
  loading: false,
  cate: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case GET_BOOK: {
      console.log(action.payload);
      return {
        ...state,
        book: state.book.push(action.payload),
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
