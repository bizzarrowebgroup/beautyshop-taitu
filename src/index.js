import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTRi3LQzoW4dMkbfPOpZVayYyMkYyp0ac",
  authDomain: "beautyshop-afe23.firebaseapp.com",
  databaseURL: "https://beautyshop-afe23.firebaseio.com",
  projectId: "beautyshop-afe23",
  storageBucket: "beautyshop-afe23.appspot.com",
  messagingSenderId: "470013044742",
  appId: "1:470013044742:web:c5cabae0efe0f2da96bb87"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
