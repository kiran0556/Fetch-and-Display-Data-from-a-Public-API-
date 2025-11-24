const API_URL = "https://jsonplaceholder.typicode.com/users";

const usersContainer = document.getElementById("usersContainer");
const statusDiv = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");

// Fetch and display users
function fetchUsers() {
  // Clear previous content
  usersContainer.innerHTML = "";
  statusDiv.textContent = "Loading users...";

  fetch(API_URL)
    .then((response) => {
      // Check HTTP status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse JSON
    })
    .then((users) => {
      statusDiv.textContent = `Loaded ${users.length} users.`;

      // If no users, show message
      if (!Array.isArray(users) || users.length === 0) {
        usersContainer.innerHTML = "<p>No users found.</p>";
        return;
      }

      // Loop through users and create cards
      users.forEach((user) => {
        const card = document.createElement("div");
        card.className = "user-card";

        const nameEl = document.createElement("div");
        nameEl.className = "user-name";
        nameEl.textContent = user.name;

        const emailEl = document.createElement("div");
        emailEl.className = "user-email";
        emailEl.textContent = user.email;

        const addressEl = document.createElement("div");
        addressEl.className = "user-address";
        const addr = user.address;
        // Address: street, suite, city, zipcode
        addressEl.textContent = `${addr.street}, ${addr.suite}, ${addr.city} - ${addr.zipcode}`;

        card.appendChild(nameEl);
        card.appendChild(emailEl);
        card.appendChild(addressEl);

        usersContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      statusDiv.textContent =
        "Failed to load users. Please check your internet connection and try again.";
      usersContainer.innerHTML = ""; // Clear any partial data
    });
}

// Reload button
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on initial page load
fetchUsers();
