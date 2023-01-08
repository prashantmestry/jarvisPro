import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
import MyThemeContextProvider from './Context/MyThemeContext';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

console.log('domain', domain);
console.log('clientId', clientId);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <MyThemeContextProvider>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <App />
      </Auth0Provider>
    </MyThemeContextProvider>
  </Provider>
);
