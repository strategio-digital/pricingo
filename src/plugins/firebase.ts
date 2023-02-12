import firebaseApp from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/functions";

// Init application
const firebase = firebaseApp.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "pricingo.firebaseapp.com",
    databaseURL: "https://pricingo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pricingo",
    storageBucket: "pricingo.appspot.com",
    messagingSenderId: "427081347275",
    appId: "1:427081347275:web:f974181cf24e953548eb4e",
    measurementId: "G-F5DXPP3F87"
});

const firestore = firebase.firestore();
const functions = firebase.functions('europe-west3');
const analytics = firebase.analytics();

// Use emulators only if project is not running on public domain
if (location.hostname !== "pricingo.app"
    && location.hostname !== 'pricingo.firebaseapp.com'
    && location.hostname !== 'pricingo.web.app') {
    functions.useEmulator(location.hostname, 5050);
    firestore.useEmulator(location.hostname, 5100);
}

export { firestore, functions, analytics }