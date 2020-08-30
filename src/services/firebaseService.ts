import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAPVSdQjNfMwTpWxQLQ_PHsX6xDJxS2PQQ",
    authDomain: "quiz-app-7a5ef.firebaseapp.com",
    databaseURL: "https://quiz-app-7a5ef.firebaseio.com",
    projectId: "quiz-app-7a5ef",
    storageBucket: "quiz-app-7a5ef.appspot.com",
    messagingSenderId: "534220942324",
    appId: "1:534220942324:web:b44e774b97f2c220d5a7a1"
  };

firebase.initializeApp(firebaseConfig);
 const messaging = firebase.messaging();

export function initNotification() {
    
    Notification.requestPermission().then((permission) => {
        console.log(permission)
        if (permission === "granted") {
            messaging.getToken().then((currentToken) => {
                if (currentToken) {
                    console.log("TOKEN")
                    console.log(currentToken);
                } else {
                    console.log('No Instance ID token available. Request permission to generate one.');

                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        }
    }) 
}