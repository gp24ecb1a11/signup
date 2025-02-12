document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        let fullName = document.getElementById("full-name").value.trim();
        let mobileNumber = document.getElementById("mobile-number").value.trim();
        let email = document.getElementById("email").value.trim();
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        let idCard = document.getElementById("id-card").files[0];

        // Validation checks
        if (!fullName || !mobileNumber || !email || !username || !password || !idCard) {
            alert("All fields are required!");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            alert("Full Name can only contain letters and spaces.");
            return;
        }

        if (!/^\d{10}$/.test(mobileNumber)) {
            alert("Mobile number must be 10 digits.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Invalid email format.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            alert("Password must contain at least one letter and one number.");
            return;
        }

        // If all checks pass
        alert("Signup successful! Redirecting to login...");
        form.reset();

        // Redirect after a small delay
        setTimeout(() => {
            window.location.href = "https://dormdash1login.netlify.app/";
        }, 1000);
    });
});
