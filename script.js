"use strict";

let myLibrary = [];

function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !(this.read);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// placeholder book
myLibrary.push(new Book("Placehoder Title", "Max Power", "1969", true));

function addBookCard(Book, index) {
    let container = document.querySelector(".book-container");

    let card = document.createElement("div");
    let title = document.createElement("p");
    let author = document.createElement("p");
    let read = document.createElement("button");
    let remove = document.createElement("button")

    title.innerText = Book.title;
    author.innerText = `${Book.author}, ${Book.year}`;

    read.innerText = Book.read ? "Already read" : "Still unread";
    read.setAttribute('onclick', 'toggleRead(this.getAttribute("data-index"));')
    read.setAttribute('data-index', index);

    remove.innerText = "Remove";
    remove.setAttribute('onclick', 'removeBook(this.getAttribute("data-index"))');
    remove.setAttribute('data-index', index);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(read);
    card.appendChild(remove);

    card.classList.add("book-card");
    card.classList.add(Book.read ? "read" : "unread");
    container.appendChild(card);
}

function addBookCards(library) {
    //first, clear container
    document.querySelector(".book-container").innerHTML = "";

    for (let i = 0; i < library.length; i++) {
        addBookCard(library[i], i);
    }
}

addBookCards(myLibrary);

/** Pops out a form (modal?) where info on new book can be inserted.
 *  Put it at the bottom of body.
*/
function newBook() {

    // if a form already exists, exit.
    if (document.querySelector(".new-book-form")) return false;

    let body = document.querySelector("body");
    let form = document.createElement("form");

    form.innerHTML = `
    <label for="title">Title
    <input type="text" id="title"></label>
    <label for="author">Author
    <input type="text" id="author"></label>
    <label for="year">Year
    <input type="tel" id="year"></label>
    <label for="read"><input type="checkbox" id="read">
    Already read</label>
    <button onclick="addBook()" type="button">Submit</button>
    `;

    form.classList.add("new-book-form");

    body.appendChild(form);
    return true;
}

/**
 * Add book to library from user input form.
 */
function addBook() {
    // get values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const year = document.querySelector("#year").value;
    const read = document.querySelector("#read").checked;

    const b = new Book(title, author, year, read);
    console.log(b);
    myLibrary.push(b);

    // remove form
    const form = document.querySelector(".new-book-form");
    form.remove();

    // refresh cards
    addBookCards(myLibrary);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    addBookCards(myLibrary);
}

function toggleRead(index) {
    myLibrary[index].toggleRead();
    addBookCards(myLibrary);
}