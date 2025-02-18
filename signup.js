// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4mO00e7KPtyCYVgwgFuwfCP1n9hSvA44",
    authDomain: "dormdash-6e970.firebaseapp.com",
    projectId: "dormdash-6e970",
    storageBucket: "dormdash-6e970.appspot.com",  // Fixed storageBucket
    messagingSenderId: "911104183529",
    appId: "1:911104183529:web:27bcec5bb027937e683478"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Handle Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form refresh

    const fullName = document.getElementById("full-name").value;
    const mobileNumber = document.getElementById("mobile-number").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const idCard = document.getElementById("id-card").files[0];

    if (!fullName || !mobileNumber || !email || !username || !password || !idCard) {
        document.getElementById("error-message").innerText = "All fields are required!";
        return;
    }

    try {
        // Create user in Firebase Authentication
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Upload ID Card to Firebase Storage
        const idCardRef = storage.ref(`idCards/${user.uid}`);
        await idCardRef.put(idCard);
        const idCardURL = await idCardRef.getDownloadURL();

        // Store additional user info in Firebase Realtime Database
        await database.ref("users/" + user.uid).set({
            fullName,
            mobileNumber,
            email,
            username,
            idCardURL
        });

        alert("Sign-up successful! Redirecting to login...");
        window.location.href = "login.html"; // Redirect after successful sign-up

    } catch (error) {
        document.getElementById("error-message").innerText = error.message;
    }
});
