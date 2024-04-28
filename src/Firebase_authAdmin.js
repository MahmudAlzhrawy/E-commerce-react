// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth,GoogleAuthProvider} from"firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGwF1Z8xV7u3MYyk8pEvqmNIBm4ow_HsQ",
    authDomain: "admin-auth-7fcb8.firebaseapp.com",
    projectId: "admin-auth-7fcb8",
    storageBucket: "admin-auth-7fcb8.appspot.com",
    messagingSenderId: "341881659234",
    appId: "1:341881659234:web:8c5b2d18be630fc7ab963b",
    measurementId: "G-8PVZFWJCKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,"[Third]");
export const auth_admin=getAuth(app);
export const provider_admin= new GoogleAuthProvider();