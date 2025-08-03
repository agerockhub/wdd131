// Set the current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set the last modified date
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Product options
const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

const select = document.getElementById('product');
products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = `${product.name} (Rating: ${product.averagerating})`;
    select.appendChild(option);
});

// Track number of reviews with localStorage
const reviewCountEl = document.getElementById('review-count');
let reviewCount = parseInt(localStorage.getItem('reviewCount')) || 0;

// Display initial count
reviewCountEl.textContent = `Total Reviews: ${reviewCount}`;

// Listen for form submission
document.querySelector('form').addEventListener('submit', function () {
    reviewCount++;
    localStorage.setItem('reviewCount', reviewCount);
    reviewCountEl.textContent = `Total Reviews: ${reviewCount}`;
});
