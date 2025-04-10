
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD6CeHsmnBypxC-qIt6chPu4TYnf-Waj4c",
  authDomain: "my-app-web-30441.firebaseapp.com",
  projectId: "my-app-web-30441",
  storageBucket: "my-app-web-30441.firebasestorage.app",
  messagingSenderId: "1095198671550",
  appId: "1:1095198671550:web:7a39306c1cbce082c214ef"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);