
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAQ9XjHG19l_9H-flbX12j61GzoMbNsuZ8",
    authDomain: "react-project-abc1c.firebaseapp.com",
    databaseURL: "https://react-project-abc1c-default-rtdb.firebaseio.com",
    projectId: "react-project-abc1c",
    storageBucket: "react-project-abc1c.appspot.com",
    messagingSenderId: "13276424207",
    appId: "1:13276424207:web:782eee8e7da698bb3f5b7a",
  };
 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export {app, auth};