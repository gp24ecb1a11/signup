// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDobwvOdyiwBCjNNBUyRNStwrMQmhFv3vY",
  authDomain: "dormdash-1becd.firebaseapp.com",
  databaseURL: "https://dormdash-1becd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dormdash-1becd",
  storageBucket: "dormdash-1becd.firebasestorage.app",
  messagingSenderId: "789434000901",
  appId: "1:789434000901:web:a8f28358c7e0091b2ede6c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage(); // ✅ Add Storage Initialization

// Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from redirecting

  // Get input values
  const fullName = document.getElementById("full-name").value;
  const mobileNumber = document.getElementById("mobile-number").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const idCard = document.getElementById("id-card").files[0]; // File upload

  // Validate inputs
  if (!fullName || !mobileNumber || !email || !username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Create User in Firebase Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;

    let idCardURL = "";
    if (idCard) {
      // Upload ID Card to Firebase Storage
      const storageRef = storage.ref(`idCards/${userId}`);
      const snapshot = await storageRef.put(idCard);
      idCardURL = await snapshot.ref.getDownloadURL();
    }

    // Save User Data to Realtime Database
    await database.ref("users/" + userId).set({
      fullName,
      mobileNumber,
      email,
      username,
      idCardURL
    });

    alert("Sign-Up Successful!");
    window.location.href = "https://dormdash1login.netlify.app/"; // ✅ Correct redirect
  } catch (error) {
    alert(error.message);
    console.error("Signup Error:", error);
  }
});
