// library app for The Odin Project
const pageContainer = document.querySelector('.page-container');
const newBookButton = document.querySelector('button.add');
const newBookDialog = document.querySelector('dialog');
const newBookForm = document.querySelector('form#save_book');

const myLibrary = [];
function Book(id, title, author, has_read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.has_read = has_read;
}

const addBookToLibrary = (book) => {
    myLibrary.push(book);
    return myLibrary;
};

const displayLibrary = () => {
    while (pageContainer.firstChild) {
        pageContainer.removeChild(pageContainer.lastChild);
      }
    for (book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.className = 'card';
        bookCard.dataset.index = myLibrary.length;
        console.log('dataset.index', bookCard.dataset.index);

        const bookTitle = document.createElement('div');
        const bookAuthor = document.createElement('div');
        const hasRead = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        bookTitle.textContent = 'Title: ' + book.title;
        bookAuthor.textContent = 'Author: ' + book.author;
        
        book.has_read === 'yes' ? hasRead.textContent = 'Completed' : hasRead.textContent = 'Not completed';
        
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(hasRead);
        bookCard.appendChild(deleteButton);
        pageContainer.appendChild(bookCard);
    }
}

newBookButton.addEventListener('click', ((e) => {
    newBookDialog.showModal();
}));

newBookForm.addEventListener('submit', ((e) => {
    // select form inputs
    const newBookTitle = document.querySelector('input#title');
    const newBookAuthor = document.querySelector('input#author');
    const hasRead = document.querySelector('input#has_read');
    
    const newBook = new Book(myLibrary.length + 1, newBookTitle.value, newBookAuthor.value, hasRead.checked ? "yes" : "no");
    addBookToLibrary(newBook);
    console.log(myLibrary);
    displayLibrary();

    // clear form inputs
    newBookTitle.value = '';
    newBookAuthor.value = '';
    hasRead.value = '';
}));

// deleteButton.addEventListener('click', (() => {
// }))