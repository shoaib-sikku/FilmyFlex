import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDkAMP44RILR7ZqQ1wJfmOlLrRrQM159mI",
  authDomain: "filmyflex-690a5.firebaseapp.com",
  projectId: "filmyflex-690a5",
  storageBucket: "filmyflex-690a5.appspot.com",
  messagingSenderId: "636769691178",
  appId: "1:636769691178:web:03fdea2eebd3a229058553",
  measurementId: "G-G8MW6SGJ6T"
};


const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const movieRef  = collection(db,"movies");
export const reviewRef  = collection(db,"reviews");
export const userRef  = collection(db,"users");
export default app;