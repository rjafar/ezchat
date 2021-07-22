import React, { useRef, useState } from 'react';
import './App.css';
import {SignIn, SignOut} from './Authenticate';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// React hooks to use with Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// initialize Firebase instance
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDzq5WEAHSzmE9GzCe4scr0oLbKh2OVo14",
    authDomain: "ezchat-9b6de.firebaseapp.com",
    projectId: "ezchat-9b6de",
    storageBucket: "ezchat-9b6de.appspot.com",
    messagingSenderId: "736389734062",
    appId: "1:736389734062:web:a69005cec259e28564973f",
    measurementId: "G-HVVJ4J7NEW"
  })
}else {
  firebase.app(); // if already initialized, use that one
}

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
        <SignOut auth={auth}/>
      </header>

      <section>
        {user ? <Chat /> : <SignIn auth={auth} />}
      </section>

    </div>
  );
}

// functional component for main chat room
function Chat () {
  // reference to end of chat so we don't need to scroll to bottom every time
  const lastMsgRef = useRef()

  // create a new collection in the firestore database called "messages"
  const messagesDB = firestore.collection('messages');

  // retrieve 25 of the latest documents in the database document
  const query = messagesDB.orderBy('createdAt').limit(25);

  // firebase hook that listens to new data coming in and returns array of message objects from DB
  const [messages] = useCollectionData(query, {idField: 'id'});

  // keeps track of updated messages being written in form text box
  const [formInput, setFormInput] = useState('');

  // event handler to submit info from form to the DB
  const sendMsg = async(e) => {
    // stop page from refreshing after form submitted
    e.preventDefault();

    // get user info from current user
    const { uid, photoURL } = auth.currentUser;

    // write to DB
    await messagesDB.add({
      text: formInput,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    // reset formInput state
    setFormInput('');

    lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  // map over array of messages
  // for each message, create a ChatMessage component with props key and message
  return (<>
    <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={lastMsgRef}></span>
    </main>

    <form onSubmit={sendMsg}>
      <input value={formInput} onChange={(e) => setFormInput(e.target.value)} placeholder="type here"/>
      <button type="submit" disabled={!formInput}>Send</button>
    </form>
    </>
  )
}


function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;
  const date = createdAt && createdAt.toDate().toDateString();
  const time = createdAt && createdAt.toDate().toLocaleTimeString('en-US')
  // check to see who message is from by comparing user id
  const messageStyle = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  return (
    <div className={`message ${messageStyle}`}>
      <img src={photoURL || 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' } alt=""/>
      <div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
      <p>
        {text}
      </p>
      </div>

    </div>
  )
  }

export default App;
