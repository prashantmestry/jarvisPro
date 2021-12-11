import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'antd/dist/antd.css';
import  MyThemeContextProvider  from './Context/MyThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyThemeContextProvider>
        <App />
      </MyThemeContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
