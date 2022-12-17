import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2Gj5_Er-vde5350i6pxUV0A6g8xqb__4",
    authDomain: "test-4e172.firebaseapp.com",
    projectId: "test-4e172",
    storageBucket: "test-4e172.appspot.com",
    messagingSenderId: "797115025300",
    appId: "1:797115025300:web:bfd956879fe2e294bbb181",
    measurementId: "G-BSGKNFPJT0"

};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export  {firebase};
