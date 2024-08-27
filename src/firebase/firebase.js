import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAcOHPGadV5NHyXZ9qxgfU8Q6FWuNvFRtg",
    authDomain: "users-71af7.firebaseapp.com",
    databaseURL: "https://users-71af7-default-rtdb.firebaseio.com",
    projectId: "users-71af7",
    storageBucket: "users-71af7.appspot.com",
    messagingSenderId: "575305234680",
    appId: "1:575305234680:web:3185d2fae2d00c0cc2230d"
  };
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
export const auth = getAuth(app);
export const database = getDatabase(app);