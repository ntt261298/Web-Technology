import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';


  ReactDOM.render(
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>, document.getElementById('root'));
  unregister();
