importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAPVSdQjNfMwTpWxQLQ_PHsX6xDJxS2PQQ",
    authDomain: "quiz-app-7a5ef.firebaseapp.com",
    databaseURL: "https://quiz-app-7a5ef.firebaseio.com",
    projectId: "quiz-app-7a5ef",
    storageBucket: "quiz-app-7a5ef.appspot.com",
    messagingSenderId: "534220942324",
    appId: "1:534220942324:web:b44e774b97f2c220d5a7a1"
  };

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.messaging();