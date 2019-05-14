import axios from 'axios';
import { GET_USER} from './types';

export const getUser = (id) => dispatch => {
  console.log('dsadadas');
  axios.get(`/api/viewuser/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
};

