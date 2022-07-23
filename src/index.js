import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';



const firebaseConfig = {
  apiKey: "AIzaSyAWBYxmfaKmcSYP8uSUu7gnerdoSDcehyM",
  authDomain: "password-manager-b7d8e.firebaseapp.com",
  projectId: "password-manager-b7d8e",
  storageBucket: "password-manager-b7d8e.appspot.com",
  messagingSenderId: "1066757502895",
  appId: "1:1066757502895:web:526c6de9d14094e2cee15a",
  measurementId: "G-1NPQFFZL93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//Context
export const Context = createContext(null);
const {Provider} = Context;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider value={{
    auth
  }}>
      <App />
  </Provider> 
);