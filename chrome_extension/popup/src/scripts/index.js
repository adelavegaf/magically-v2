import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Store} from 'react-chrome-redux';
import AppContainer from './containers/AppContainer';

const store = new Store({
  portName: 'magically' // communication port name
});

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer/>
    </Provider>,
    document.getElementById('root'));
});

