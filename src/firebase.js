import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
     apiKey: "AIzaSyB0QrhMA5A7Ekh6buY6BUrzOZ2915WS7Pg",
     authDomain: "trello-practice.firebaseapp.com",
     databaseURL: "https://trello-practice.firebaseio.com",
     projectId: "trello-practice",
     storageBucket: "trello-practice.appspot.com",
     messagingSenderId: "803740798875",
     appId: "1:803740798875:web:5e6b3f0b7819dbae42db3e",
     measurementId: "G-ME5MDH8XY3"
})

export {firebaseConfig as firebase}
