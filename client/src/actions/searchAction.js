import axios from 'axios';
import { SEARCH_QUESTION, SEARCH_CATE } from './types';

export const getSearchResults = (type, val) => dispatch => {
  axios.get(`/api/search?type=${type}&question=${val}`)
    .then(res =>
      dispatch({
        type: SEARCH_QUESTION,
        payload: res.data
      })
    )
}
