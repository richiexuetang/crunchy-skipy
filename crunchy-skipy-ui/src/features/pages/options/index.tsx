import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RootStore } from '../../redux/store';
import { App } from './App';

ReactDOM.render(
  <Provider store={RootStore}>
    <App/>
  </Provider>,
  document.getElementById('app-container'),
);