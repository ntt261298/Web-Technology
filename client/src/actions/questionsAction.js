import axios from 'axios';
import { SET_LOADING, TOGGLE_LOGIN, TOGGLE_FORGET, GET_QUESTIONS, GET_QUESTION, ADD_QUESTION, GET_CATE } from './types';

export const toggleLogin = () => {
  return {
    type: TOGGLE_LOGIN
  }
}

export const toggleForget = () => {
  return {
    type: TOGGLE_FORGET
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}

export const getQuestions = () => dispatch => {
  dispatch(setLoading());
  axios.get('/api/questions')
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    }
    )
};

export const getQuestion = (id) => dispatch => {
  axios.get(`/api/questions/detail/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_QUESTION,
        payload: res.data
      })
    }
    )
};

export const addQuestion = (title, problem, code, category, token) => dispatch => {
  axios.post(`/api/questions`, {
    title, problem, code, category, token
  })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_QUESTION,
        payload: res.data
      })
    }
    )
};

export const getCate = () => dispatch => {
  dispatch(setLoading());
  axios.get('/api/questions/cate')
    .then(res =>
      dispatch({
        type: GET_CATE,
        payload: res.data
      })
    )
};
