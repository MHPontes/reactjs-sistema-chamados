import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: "tickets-e2ee6.firebaseapp.com",

  projectId: "tickets-e2ee6",

  storageBucket: "tickets-e2ee6.appspot.com",

  messagingSenderId: "868134105222",

  appId: "1:868134105222:web:ad55460bda4b264d38e107",

  measurementId: "G-YGE4XPJE2W",
};

const firebaseapp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

export { auth, db, storage };
