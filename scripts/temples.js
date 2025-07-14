
// Set the current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set the last modified date
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Hamburger Menu Toggle
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuButton.classList.toggle("open");
});
