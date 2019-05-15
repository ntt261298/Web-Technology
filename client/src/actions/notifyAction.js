import axios from 'axios';
import { GET_NOTIFY, REMOVE_NOTIFY } from './types';

export const getNotify = (token) => dispatch => {
  axios.get(`/api/notify/${token}`)
    .then(res =>
      dispatch({
        type: GET_NOTIFY,
        payload: res.data
      })
    )
};

export const removeNotify = (token) => dispatch => {
    axios.post('/api/notify', {
        token
    })
      .then(res =>
        dispatch({
          type: REMOVE_NOTIFY,
          payload: res.data
        })
      )
  };