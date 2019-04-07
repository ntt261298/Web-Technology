import {  GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, USER_CHECKOUT } from '../actions/types';

const initialState ={
  carts: []
}

const cartItem = (state, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          id: action.id,
          bookId: action.bookId,
          count: action.count,
          name: action.name,
          price: action.price,
          bookImage: action.bookImage,
          author: action.author,
          rating: action.rating
        };
      case REMOVE_FROM_CART:
        return state.id !== action.id;
      case UPDATE_CART_ITEM:
        if (state.id !== action.id) {
          return state;
        }
        if (action.cate === 'minus') {
          if(state.count === 1) return state;
          return Object.assign(
            {},
            state,
            {
              count: state.count - 1,
            }
          );
        }
        if (action.cate === 'add') {
          return Object.assign(
            {},
            state,
            {
              count: state.count + 1,
            }
          );
        }
      default:
        return state;
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return state;
    case ADD_TO_CART:
      return {
        ...state,
        carts: [...state.carts, cartItem(undefined, action)]
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        carts: state.carts.filter(item => cartItem(item, action))
      }
    case UPDATE_CART_ITEM:
      return {
        ...state,
        carts: state.carts.map(item => cartItem(item, action))
      }
    case USER_CHECKOUT:
      return {
        ...state,
        carts: []
      }
    default:
      return state;
  }
}
