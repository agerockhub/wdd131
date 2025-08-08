
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



//features places card dynamic content
let currentIndex = 0;
let cardsData = [];

function parseCardData(text) {
    const blocks = text.split('//').filter(Boolean);
    return blocks.map(block => {
        const lines = block.trim().split('\n');
        let card = {};
        lines.forEach(line => {
            const [key, ...value] = line.split(':');
            card[key.trim()] = value.join(':').trim();
        });
        return card;
    });
}

function updateCard(card) {
    document.getElementById("name").textContent = card.name;
    const imgElement = document.querySelector("#img img");
    imgElement.src = `images/${card.img}`;
    imgElement.alt = card.alt;
    document.getElementById("loc").textContent = card.loc;
}

function cycleCards() {
    if (cardsData.length === 0) return;
    updateCard(cardsData[currentIndex]);
    currentIndex = (currentIndex + 1) % cardsData.length;
}

// Fetch data on load
fetch("card.txt")
    .then(response => response.text())
    .then(data => {
        cardsData = parseCardData(data);
        cycleCards(); // Initial call
        setInterval(cycleCards, 10000); // Every 10 seconds
    })
    .catch(error => {
        console.error("Failed to load card.txt:", error);
    });


// dynamically loading of images from sponsors.txt file
fetch("sponsors.txt")
    .then(response => response.text())
    .then(data => {
        const sponsorsContainer = document.getElementById("sponsors");
        const lines = data.trim().split("\n");

        // Create a document fragment to boost performance
        const fragment = document.createDocumentFragment();

        // Build sponsor images
        lines.forEach(line => {
            const [filename, altText] = line.split("|").map(part => part.trim());
            const img = document.createElement("img");
            img.src = `images/${filename}`;
            img.alt = altText;
            fragment.appendChild(img);
        });

        // Duplicate for infinite scrolling illusion
        sponsorsContainer.appendChild(fragment.cloneNode(true)); // first set
        sponsorsContainer.appendChild(fragment); // duplicate
    })
    .catch(error => {
        console.error("Error loading sponsors.txt:", error);
    });


//scrolling of images TEP EXPERIENCES
fetch('experiences.txt')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('experiences');
        const lines = data.trim().split('\n');

        let imagesArray = [];
        let currentImage = '', currentAlt = '', currentCaption = '';

        lines.forEach(line => {
            if (line.startsWith('image:')) {
                currentImage = line.split(':')[1].trim();
                if (!currentImage.match(/\.(jpg|jpeg|png|gif)$/)) {
                    currentImage += '.jpg'; // Add default extension if missing
                }
            } else if (line.startsWith('alt:')) {
                currentAlt = line.split(':')[1].trim();
            } else if (line.startsWith('figcaption:')) {
                currentCaption = line.split(':')[1].trim();

                imagesArray.push({
                    src: 'images/' + currentImage,
                    alt: currentAlt,
                    caption: currentCaption
                });
            }
        });

        // Function to create figure elements
        const createFigures = (images) => {
            return images.map(item => {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt;

                const caption = document.createElement('figcaption');
                caption.textContent = item.caption;

                figure.appendChild(img);
                figure.appendChild(caption);
                return figure;
            });
        };

        // Append original and duplicated image sets
        const allFigures = [...createFigures(imagesArray), ...createFigures(imagesArray)];
        allFigures.forEach(fig => container.appendChild(fig));
    })
    .catch(error => console.error('Error loading experiences:', error));

// Save form data to localStorage
document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;

    // Get existing entries or start fresh
    let entries = JSON.parse(localStorage.getItem("bookings")) || [];

    // Add new entry
    entries.push({ name, email, tel });

    // Save back to localStorage
    localStorage.setItem("bookings", JSON.stringify(entries));

    alert("Booking saved locally!");
    this.reset();
});

// Download as .txt file
document.getElementById("downloadBtn").addEventListener("click", function () {
    let entries = JSON.parse(localStorage.getItem("bookings")) || [];

    if (entries.length === 0) {
        alert("No entries to download.");
        return;
    }

    // Format text
    let textContent = entries.map((e, i) =>
        `Entry ${i + 1}\nName: ${e.name}\nEmail: ${e.email}\nTel: ${e.tel}\n---`
    ).join("\n");

    // Create a downloadable file
    let blob = new Blob([textContent], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bookings.txt";
    link.click();
});