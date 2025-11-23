import firebase from 'firebase/app';
import 'firebase/auth';  // Import the Firebase Authentication service

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the existing instance
}

// Firebase Authentication instance
const auth = firebase.auth();
const signInForm = document.getElementById('sign-in-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const signOutButton = document.getElementById('sign-out-button');

// Sign In Function
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Signed in as:', user.email);
      
      // Show user info and hide sign-in form
      userName.textContent = user.email;
      userInfo.style.display = 'block';
      signInForm.style.display = 'none';
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Sign Out Function
signOutButton.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Signed out successfully');
      // Show sign-in form and hide user info
      userInfo.style.display = 'none';
      signInForm.style.display = 'block';
    })
    .catch((error) => {
      alert('Sign out failed: ' + error.message);
    });
});
