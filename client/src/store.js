import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { loadState, saveState } from './helpers/localStorage';

const persistedState = loadState();
const initialState = [];

const middleware = [thunk];

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    devTools
  ));
store.subscribe(() => {
  saveState(store.getState());
})


export default store;
