import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Store} from 'react-chrome-redux';
import App from './App';

const store = new Store({
  portName: 'magically' // communication port name
});

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'));
});

