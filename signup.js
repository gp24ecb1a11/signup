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
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

console.log("Signup script loaded!"); // ✅ Check if script is running

// Handle Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted!"); // ✅ Check if form is detected

    const fullName = document.getElementById("full-name").value;
    const mobileNumber = document.getElementById("mobile-number").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const idCard = document.getElementById("id-card").files[0];

    console.log("Collected Data:", { fullName, mobileNumber, email, username, password, idCard });

    if (!fullName || !mobileNumber || !email || !username || !password || !idCard) {
        console.log("Error: Missing fields");
        document.getElementById("error-message").innerText = "All fields are required!";
        return;
    }

    try {
        // Create user in Firebase Authentication
        console.log("Creating user...");
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log("User created:", user);

        // Upload ID Card to Firebase Storage
        console.log("Uploading ID card...");
        const idCardRef = storage.ref(`idCards/${user.uid}`);
        await idCardRef.put(idCard);
        const idCardURL = await idCardRef.getDownloadURL();
        console.log("ID Card uploaded:", idCardURL);

        // Store user info in Firebase Realtime Database
        console.log("Storing user info...");
        await database.ref("users/" + user.uid).set({
            fullName,
            mobileNumber,
            email,
            username,
            idCardURL
        });
        console.log("User info stored successfully!");

        alert("Sign-up successful! Redirecting to login...");
        window.location.href = "https://dormdash1login.netlify.app/";

    } catch (error) {
        console.log("Error:", error.message);
        document.getElementById("error-message").innerText = error.message;
    }
});
