import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RootStore } from '../../redux/store';
import { App } from './App';

const container = document.getElementById('app-container');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={RootStore}>
      <App/>
    </Provider>
  </React.StrictMode>
);