// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDglEdscSO3Vvx7PS855UVpUNIpoavfPWY",
  authDomain: "netflix-clone-4e7e1.firebaseapp.com",
  projectId: "netflix-clone-4e7e1",
  storageBucket: "netflix-clone-4e7e1.appspot.com",
  messagingSenderId: "484757389310",
  appId: "1:484757389310:web:3d8e5a8f84d1f4a10c4aaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };