import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import MyThemeContextProvider from './Context/MyThemeContext';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <MyThemeContextProvider>
      <App />
    </MyThemeContextProvider>
  </Provider>
);
