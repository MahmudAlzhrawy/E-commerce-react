// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB45nadv278wmGkb0BZIwH6C0sRcy-6-nY",
  authDomain: "cartitems-ecea2.firebaseapp.com",
  projectId: "cartitems-ecea2",
  storageBucket: "cartitems-ecea2.appspot.com",
  messagingSenderId: "112747885586",
  appId: "1:112747885586:web:61aff679076635821c94cb",
  measurementId: "G-88QEKENLSD"
};

// Initialize Firebase
const appseconde = initializeApp(firebaseConfig,"[SECOND]");
export const dbc=getFirestore(appseconde);