import axios from 'axios';
import { GET_COMMENT, ADD_COMMENT }from './types';

export const getComment = () => dispatch => {
  axios.get('/api/comment')
    .then(res =>
      dispatch({
        type: GET_COMMENT,
        payload: res.data
      })
    )
};

export const addComment = (token, bookID, comment, rating) => dispatch => {
  axios.post(`/api/comment`, {
    token: token,
    bookID: bookID,
    comment: comment,
    rating: rating
  }).then(res => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    }
  )
};
