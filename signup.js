import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAeOS8_0tDWKnfAwLf0GRKr6JaopYj1nnY",
    authDomain: "dormdash-40a10.firebaseapp.com",
    projectId: "dormdash-40a10",
    storageBucket: "dormdash-40a10.appspot.com",
    messagingSenderId: "219135353050",
    appId: "1:219135353050:web:49446a2e74414ebf8105e3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("full-name").value;
    const mobileNumber = document.getElementById("mobile-number").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const idCardFile = document.getElementById("id-card").files[0];

    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let idCardBase64 = "";
        if (idCardFile) {
            const reader = new FileReader();
            reader.readAsDataURL(idCardFile);
            await new Promise((resolve) => (reader.onload = () => resolve()));
            idCardBase64 = reader.result; // Convert file to Base64
        }

        // Store user info + Base64 ID card in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName,
            mobileNumber,
            email,
            username,
            idCard: idCardBase64,
        });

        alert("Sign-up successful! Redirecting to login...");
        window.location.href = "https://dormdash1login.netlify.app/"; // Redirect to login page after successful sign-up

    } catch (error) {
        alert(error.message);
    }
});
