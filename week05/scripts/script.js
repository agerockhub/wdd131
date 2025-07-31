const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function () {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');

        li.appendChild(deleteButton);
        list.appendChild(li);

        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        input.value = '';
        input.focus();
    } else {
        alert('Please enter a book and chapter (e.g., Alma 5).');
    }
});



// 1 & 2. Declare array and assign getChapterList result, default to empty array if falsy
let chaptersArray = getChapterList() || [];

//  Populate the displayed list
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// 4. Modify button click event listener
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value.trim());  // Display new item
        chaptersArray.push(input.value.trim());  // Add to array
        setChapterList();  // Update localStorage
        input.value = '';  // Clear input
        input.focus();     // Refocus input
    }
});

// 5 & 6 7. Define displayList function
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    li.appendChild(deleteButton);
    list.appendChild(li);

    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
        deleteChapter(li.textContent);  // Includes ❌ so must slice later
        input.focus();
    });

    console.log('I like to copy code instead of typing it out myself and trying to understand it.');
}

// 8. Define setChapterList
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// 9. Define getChapterList
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// 10. Define deleteChapter
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // Remove ❌
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}


/*
Instructions PAGE
https://byui-cse.github.io/wdd131-ww-course/week05/prepare-localStorage.html
*/