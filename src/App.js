import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// React hooks to use with Firebase
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// initialize Firebase instance
firebase.initializeApp({
  apiKey: "AIzaSyDzq5WEAHSzmE9GzCe4scr0oLbKh2OVo14",
  authDomain: "ezchat-9b6de.firebaseapp.com",
  projectId: "ezchat-9b6de",
  storageBucket: "ezchat-9b6de.appspot.com",
  messagingSenderId: "736389734062",
  appId: "1:736389734062:web:a69005cec259e28564973f",
  measurementId: "G-HVVJ4J7NEW"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  return (
    <div className="App">
      <header>

      </header>

      
    </div>
  );
}

export default App;
