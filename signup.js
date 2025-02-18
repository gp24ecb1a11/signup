// Check if Firebase is loaded
if (typeof firebase === "undefined") {
    console.error("Firebase SDK not loaded!");
} else {
    console.log("Firebase loaded successfully!");
}

// Firebase services
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Handle Sign-Up Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission
    console.log("Form submitted!");

    // Get user input values
    const fullName = document.getElementById("full-name").value;
    const mobileNumber = document.getElementById("mobile-number").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const idCard = document.getElementById("id-card").files[0];

    // Basic validation
    if (!fullName || !mobileNumber || !email || !username || !password || !idCard) {
        document.getElementById("error-message").textContent = "All fields are required!";
        return;
    }

    try {
        // Create user with email & password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);

        // Upload ID card to Firebase Storage
        const storageRef = storage.ref(`id-cards/${user.uid}`);
        await storageRef.put(idCard);
        const idCardURL = await storageRef.getDownloadURL();
        console.log("ID Card Uploaded:", idCardURL);

        // Save user details in Firebase Database
        await database.ref("users/" + user.uid).set({
            fullName: fullName,
            mobileNumber: mobileNumber,
            email: email,
            username: username,
            idCardURL: idCardURL
        });

        console.log("User data stored in database.");
        alert("Sign-up successful!");
        window.location.href = "login.html"; // Redirect to login page

    } catch (error) {
        console.error("Sign-up error:", error.message);
        document.getElementById("error-message").textContent = error.message;
    }
});
