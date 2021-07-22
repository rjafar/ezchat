import firebase from 'firebase/app';
import React from 'react';

export function SignIn({auth}) {
    const signInGoogle = () => {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(googleAuthProvider);
    }
  
    return (<>
      <h1 className="welcome">Hello! Welcome to ezchat!</h1>
      <button className="signInButton" onClick={() => signInGoogle()}>Sign in with Google</button>
    </>)
  }

export function SignOut({auth}) {
    // check to see if currentUser is valid so we can sign them out
    return auth.currentUser && (
      <button className="signOutButton" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
