import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import questionsReducer from './questionsReducer';
import accountsReducer from './accountsReducer';
import searchReducer from './searchReducer';
import commentReducer from './commentReducer';
import answersReducer from './answersReducer';

export default combineReducers({
  item: itemsReducer,
  question: questionsReducer,
  account: accountsReducer,
  search: searchReducer,
  comment: commentReducer,
  answer: answersReducer,
})
