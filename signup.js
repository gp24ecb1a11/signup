// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDobwvOdyiwBCjNNBUyRNStwrMQmhFv3vY",
  authDomain: "dormdash-1becd.firebaseapp.com",
  databaseURL: "https://dormdash-1becd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dormdash-1becd",
  storageBucket: "dormdash-1becd.firebasestorage.app",
  messagingSenderId: "789434000901",
  appId: "1:789434000901:web:a8f28358c7e0091b2ede6c"
});

const auth = firebase.auth();
const database = firebase.database(); // For storing user data

// Handle sign-up form submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get user inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Firebase authentication (Create User)
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store additional user data in Realtime Database
    await database.ref("users/" + user.uid).set({
      email: email
    });

    alert("Sign-up successful! Redirecting to login page...");
    
    // Redirect to login page
    window.location.href = "https://dormdash1login.netlify.app/";
  } catch (error) {
    alert(error.message);
  }
});
