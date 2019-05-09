import axios from 'axios';
import { GET_ANSWERS, ADD_ANSWER } from './types';

export const getAnswers = (id) => dispatch => {
  axios.get(`/api/answer/${id}`)
    .then(res =>
      dispatch({
        type: GET_ANSWERS,
        payload: res.data
      })
    )
};

export const addAnswer = (token, questionID, answerText, answerCode) => dispatch => {
  axios.post(`/api/answer`, {
    token,
    questionID,
    answerText,
    answerCode
  }).then(res => {
      dispatch({
        type: ADD_ANSWER,
        payload: res.data
      })
    }
  )
};
