import axios from 'axios';
import { GET_NOTIFY, REMOVE_NOTIFY } from './types';

export const getNotify = (token) => dispatch => {
  axios.get(`http://127.0.0.1:5000/api/notify/${token}`)
    .then(res =>
      dispatch({
        type: GET_NOTIFY,
        payload: res.data
      })
    )
};

export const removeNotify = (token) => dispatch => {
    axios.post('http://127.0.0.1:5000/api/notify', {
        token
    })
      .then(res =>
        dispatch({
          type: REMOVE_NOTIFY,
          payload: res.data
        })
      )
  };