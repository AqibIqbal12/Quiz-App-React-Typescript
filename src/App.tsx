import React from 'react';
import './App.css';
import { Home } from './Components/Home';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { initNotification } from './services/firebaseService';

function App() {
  if (firebase.messaging.isSupported()) {
    initNotification();
  }

  return (
    <>
      <div className="App">
        <h1>Quiz App</h1>
        <Home />
      </div>
      <footer className="footer">
        <p>Developed By AqibIqbal</p>
      </footer>
    </>
  );
}

export default App;
