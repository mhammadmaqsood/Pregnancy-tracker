import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDvj_-8elCgogqVP9yKzOWU_nhF-GBtZpM",
    authDomain: "calender-6e403.firebaseapp.com",
    databaseURL: "https://calender-6e403.firebaseio.com",
    projectId: "calender-6e403",
    storageBucket: "calender-6e403.appspot.com",
    messagingSenderId: "905128617701",
    appId: "1:905128617701:web:f07a7e8a48a0d692ca560c",
    measurementId: "G-JZ4B0HN76W"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export default fb
