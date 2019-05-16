import axios from 'axios';
import { GET_ANSWERS, ADD_ANSWER } from './types';

export const getAnswers = (id) => dispatch => {
  axios.get(`http://127.0.0.1:5000/api/answer/${id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_ANSWERS,
        payload: res.data
      })
    }
    )
};

export const addAnswer = (token, questionID, answerText, answerCode, rating) => dispatch => {
  axios.post(`http://127.0.0.1:5000/api/answer`, {
    token,
    questionID,
    answerText,
    answerCode,
    rating
  }).then(res => {
      dispatch({
        type: ADD_ANSWER,
        payload: res.data
      })
    }
  )
};
