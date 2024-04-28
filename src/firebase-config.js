
import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import{getAuth,GoogleAuthProvider} from"firebase/auth"
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyA1mjHIHYmusk5JZk02EFxCUqMzMZ7E6gU",
    authDomain: "e-commerce-react-5ced2.firebaseapp.com",
    projectId: "e-commerce-react-5ced2",
    storageBucket: "e-commerce-react-5ced2.appspot.com",
    messagingSenderId: "819602654880",
    appId: "1:819602654880:web:c81ca64ce15e181fd66bc5",
    measurementId: "G-MT1W24LBNR"
};
const app= initializeApp(firebaseConfig);
export  const db=getFirestore(app);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();
//const analytics = getAnalytics(app);