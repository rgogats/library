// library app for The Odin Project

const myLibrary = [];

function Book(title, author, is_read) {
    this.title = title;
    this.author = author;
    this.is_read = is_read;
}

const TestBook = new Book('Dracula', 'Bram Stoker', true);

const addBookToLibrary = (book) => {
    myLibrary.push(book);
};