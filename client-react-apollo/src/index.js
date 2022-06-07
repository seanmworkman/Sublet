import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import Landing from './views/Landing';
import Places from './views/Places';
import './index.css';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache
})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HashRouter>
        <Routes>
          <Route exact path="/" name="Default Landing Page" element={<App />} />
          <Route exact path="/Landing" name="Landing" element={<Landing />} />
          <Route exact path="/Places" name="Places" element={<Places />} />
        </Routes>
      </HashRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
