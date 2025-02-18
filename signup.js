// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4mO00e7KPtyCYVgwgFuwfCP1n9hSvA44",
  authDomain: "dormdash-6e970.firebaseapp.com",
  projectId: "dormdash-6e970",
  storageBucket: "dormdash-6e970.appspot.com",
  messagingSenderId: "911104183529",
  appId: "1:911104183529:web:27bcec5bb027937e683478"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase authentication service
const auth = firebase.auth();

// Handle sign-up form submission
document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (!username || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  // Firebase authentication - create user with email and password
  auth.createUserWithEmailAndPassword(username + "@dormdash.com", password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      alert("Sign-up successful! Redirecting to login...");
      window.location.href = "https://dormdash1login.netlify.app/"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Sign-up error:", error.message);
      errorMessage.textContent = error.message;
    });
});
