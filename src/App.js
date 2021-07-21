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

// global firebase variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  // checks if user is logged in (authenticated) or null
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>
          ezchat
        </h1>
        <SignOut />
      </header>

      <section>
        {user ? <Chat /> : <SignIn />}
      </section>

    </div>
  );
}

// functional components
// SignIn allows user to provide Google credentials to authenticate
function SignIn() {
  const signInGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleAuthProvider);
  }

  return (
    <button className="signInButton" onClick={signInGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  // check to see if currentUser is valid so we can sign them out
  return auth.currentUser && (
    <button className="signOutButton" onClick={auth.signOut()}>Sign Out</button>
  )
}



function Chat () {

}

export default App;
