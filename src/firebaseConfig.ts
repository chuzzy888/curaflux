import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3sUCX0r7DscijZVJtF8KxuXPQ51e4Krk",
  authDomain: "curaflux-4a6f9.firebaseapp.com",
  projectId: "curaflux-4a6f9",
  storageBucket: "curaflux-4a6f9.appspot.com",
  messagingSenderId: "1083607984788",
  appId: "1:1083607984788:web:9a621b4036a89a62f6e281",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
