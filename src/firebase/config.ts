import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvs7gk2KBm3mSUvcTXJBP_D5r8YcUkHks",
  authDomain: "sistema-de-diarias.firebaseapp.com",
  projectId: "sistema-de-diarias",
  storageBucket: "sistema-de-diarias.appspot.com",
  messagingSenderId: "801910525482",
  appId: "1:801910525482:web:f1cdc3aa9a456803f4bd53",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
