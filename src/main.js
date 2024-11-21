import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyA_L4FVao2ekv0qurUE1f8B_B6KpUD7-V4",
  
    authDomain: "login-37092.firebaseapp.com",
  
    projectId: "login-37092",
  
    storageBucket: "login-37092.firebasestorage.app",
  
    messagingSenderId: "643600299039",
  
    appId: "1:643600299039:web:64b74d4ae46e8a8098112a"
  
  };
  
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')