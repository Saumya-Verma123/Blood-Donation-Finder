import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB05Sco7F9vSENoaXUs49wFa0Q-mknOiUs",
    authDomain: "blood-donation-57115.firebaseapp.com",
    projectId: "blood-donation-57115",
    storageBucket: "blood-donation-57115.appspot.com",
    messagingSenderId: "203482166104",
    appId: "1:203482166104:web:1aa75a46cf2ce61086eb2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Fetch and Display Donors
async function loadDonors() {
    const donorList = document.getElementById("donorList");
    donorList.innerHTML = "<p>Loading donors...</p>"; // Show loading text

    try {
        const querySnapshot = await getDocs(collection(db, "theuserlist"));
        donorList.innerHTML = ""; // Clear loading text

        querySnapshot.forEach((doc) => {
            const donor = doc.data();

            const donorCard = document.createElement("div");
            donorCard.classList.add("donor-card");

            donorCard.innerHTML = `
                <h3>${donor.Username || "Unknown"}</h3>
                <p><strong>Age:</strong> ${donor.Age || "N/A"}</p>
                <p><strong>Contact:</strong> ${donor.Contact || "N/A"}</p>
                <p><strong>Blood Group:</strong> ${donor.BloodGroup || "N/A"}</p>
                <p><strong>Availability:</strong> ${donor.Availability || "N/A"}</p>
                <p><strong>Location:</strong> ${donor.Location || "N/A"}</p>
            `;

            donorList.appendChild(donorCard);
        });

        if (querySnapshot.empty) {
            donorList.innerHTML = "<p>No donors found.</p>"; // Show message if no donors exist
        }

    } catch (error) {
        console.error("Error fetching donor data:", error);
        donorList.innerHTML = "<p>Failed to load donors. Please try again later.</p>";
    }
}

// Call function when the page loads
document.addEventListener("DOMContentLoaded", loadDonors);


