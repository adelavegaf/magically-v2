import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './containers/AppContainer';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><AppContainer/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
