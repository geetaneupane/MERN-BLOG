// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,                                //The actual key is in .env file.In case of vite inside the front end folder, we use import.meta.env instead of process.env ok?  
  authDomain: "mern-blogging-2bc8b.firebaseapp.com",
  projectId: "mern-blogging-2bc8b",
  storageBucket: "mern-blogging-2bc8b.appspot.com",
  messagingSenderId: "674073799122",
  appId: "1:674073799122:web:f9756b87b457633c3b000b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


//We should hide the apiKey so, create an environment file .env inside the client folder(the root directory for the newly created .env file should be the client folder.)
//We should turn on google authenticatin in order to let our users to sign in with Google.Thank you!