// Firebase configuration
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

// Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", function (event) {
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

  // Firebase Authentication - Create User
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;

      // Upload ID Card to Firebase Storage
      if (idCard) {
        const storageRef = firebase.storage().ref("idCards/" + userId);
        storageRef.put(idCard).then(snapshot => {
          snapshot.ref.getDownloadURL().then(idCardURL => {
            // Save User Data to Realtime Database
            database.ref("users/" + userId).set({
              fullName,
              mobileNumber,
              email,
              username,
              idCardURL
            }).then(() => {
              alert("Sign-Up Successful!");
              window.location.href = "https://dormdash1login.netlify.app/"; // Redirect to login
            }).catch(error => {
              console.error("Error saving user data:", error);
            });
          });
        });
      } else {
        // Save data without ID card
        database.ref("users/" + userId).set({
          fullName,
          mobileNumber,
          email,
          username
        }).then(() => {
          alert("Sign-Up Successful!");
          window.location.href = "https://dormdash1login.netlify.app/";
        }).catch(error => {
          console.error("Error saving user data:", error);
        });
      }
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
});
