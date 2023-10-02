import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDz1WLEElL73007SBdGnuxBxBUW0UfggIg",
    authDomain: "phoneauth-325f4.firebaseapp.com",
    projectId: "phoneauth-325f4",
    storageBucket: "phoneauth-325f4.appspot.com",
    messagingSenderId: "383897624982",
    appId: "1:383897624982:web:fd579906b4a5f6fee7fdb7",
    measurementId: "G-S7XEZE3Q8P"
   };
  
   export { firebaseConfig };
   
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
   