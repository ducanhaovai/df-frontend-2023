let books = [
    { name: "Refactoring", author: "Martin Fowler", topic: "Programming" },
    { name: "Designing Data-Intensive Applications", author: "Martin Kleppmann", topic: "Database" },
    { name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" }
];


function addBook() {
    document.getElementById("bookForm").style.display = "block";
}

document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("bookForm").style.display = "none";
    resetForm();
});

document.getElementById("addBookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("addBookName").value;
    const author = document.getElementById("addBookAuthor").value;
    const topic = document.getElementById("addBookTopic").value;

    if (name && author && topic) {
        books.push({ name, author, topic });
        displayBooks(books);
        resetForm();
        closeAddBookPopup();
    } else {
        alert("Please fill in all fields.");
    }
});


function displayBooks(booksToDisplay) {
    const table = document.getElementById("book-table").getElementsByTagName('tbody')[0];
    table.innerHTML = "";

    for (let i = 0; i < booksToDisplay.length; i++) {
        const book = booksToDisplay[i];
        if (!book.deleted) {
            const row = table.insertRow();
            row.innerHTML = `<td>${book.name}</td><td>${book.author}</td><td>${book.topic}</td><td><button class="delete-bt" onclick="deleteBook(${i})">Delete</button></td>`;
        }
    }
}

function deleteBook(index) {
    const bookName = books[index].name;
    document.getElementById("delete-popup").style.display = "block";
    document.querySelector(".popup-content-del").textContent = `Do you want to delete "${bookName}"?`;

    document.getElementById("confirm-delete-button").addEventListener("click", function () {
        books[index].deleted = true; 
        displayBooks(books);
        document.getElementById("delete-popup").style.display = "none";
    });

    document.getElementById("cancel-delete-button").addEventListener("click", function () {
        document.getElementById("delete-popup").style.display = "none";
    });
}

function resetForm() {
    document.getElementById("addBookName").value = "";
    document.getElementById("addBookAuthor").value = "";
    document.getElementById("addBookTopic").value = "";
}

window.addEventListener("load", function () {
    displayBooks(books);
});


function openAddBookPopup() {
    document.getElementById("bookForm").style.display = "block";
}
function searchBooks() {
    var searchTerm = document.getElementById("search-book").value.toLowerCase();
    var filteredBooks = books.filter(function (book) {
        return book.name.toLowerCase().includes(searchTerm) && !book.deleted; 
    });
    displayBooks(filteredBooks);
}
