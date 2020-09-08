import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })


  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignin = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        
      })
      .catch(err => {
        console.log(err);
       
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(response => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signOutUser);
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignin}>Sign in</button>

      }
      {
        user.isSignedIn && <div>
          <h3>Welcome, {user.name} mama !! </h3>
          <p>Your email: {user.email}</p>
          <br />
          <p>Your Profile picture: </p>
          <img src={user.photo} alt="propic" />
        </div>
      }
    </div>
  );
}

export default App;
