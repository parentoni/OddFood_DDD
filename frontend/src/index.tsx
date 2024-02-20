import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from 'react-ga4'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

ReactGA.initialize("G-04CS4P04VX")

root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
