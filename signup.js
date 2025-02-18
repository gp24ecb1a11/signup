// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDobwvOdyiwBCjNNBUyRNStwrMQmhFv3vY",
  authDomain: "dormdash-1becd.firebaseapp.com",
  databaseURL: "https://dormdash-1becd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dormdash-1becd",
  storageBucket: "dormdash-1becd.appspot.com",
  messagingSenderId: "789434000901",
  appId: "1:789434000901:web:a8f28358c7e0091b2ede6c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Handle Signup
document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById("full-name").value;
  const mobileNumber = document.getElementById("mobile-number").value;
  const idCard = document.getElementById("id-card").files[0]; // File upload
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Validate Inputs
  if (!fullName || !mobileNumber || !idCard || !email || !username || !password) {
    errorMessage.innerText = "Please fill in all fields.";
    return;
  }

  // Create user in Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Store additional user data in Realtime Database
      database.ref("users/" + user.uid).set({
        fullName: fullName,
        mobileNumber: mobileNumber,
        email: email,
        username: username
      });

      errorMessage.innerText = "Signup successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "https://dormdash1login.netlify.app/"; // Redirect to login
      }, 2000);
    })
    .catch((error) => {
      errorMessage.innerText = error.message;
    });
});
