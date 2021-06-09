import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAMxXbBV0a_PWuVqwb6F1msDXn74TCqC5M",
    authDomain: "mvpapp-581fb.firebaseapp.com",
    databaseURL: "https://mvpapp-581fb.firebaseio.com",
    projectId: "mvpapp-581fb",
    storageBucket: "mvpapp-581fb.appspot.com",
    messagingSenderId: "943358745326",
    appId: "1:943358745326:web:f9f36bdb0fd6646e6f71ff"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
    firebase,
    db,
};