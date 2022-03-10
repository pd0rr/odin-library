"use strict";

let myLibrary = [];

function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// placeholder book
myLibrary.push(new Book("Placehoder Title", "Max Power", "1969", true));

function addBookCard(Book) {
    let container = document.querySelector(".book-container");

    let card = document.createElement("div");
    let title = document.createElement("p");
    let author = document.createElement("p");
    let read = document.createElement("p");

    title.innerText = Book.title;
    author.innerText = `${Book.author}, ${Book.year}`;
    read.innerText = Book.read ? "Already read" : "Still unread";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(read);

    card.classList.add("book-card");
    card.classList.add(Book.read ? "read" : "unread");
    container.appendChild(card);
}

function addBookCards(library) {
    for (const b of library) {
        addBookCard(b);
    }
}

addBookCards(myLibrary);