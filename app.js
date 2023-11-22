// library app for The Odin Project
const pageContainer = document.querySelector('.page-container');
const newBookButton = document.querySelector('button.add');
const newBookDialog = document.querySelector('dialog');
const newBookForm = document.querySelector('form#save_book');


function Book(title, author, has_read) {
    this.title = title;
    this.author = author;
    this.has_read = has_read;
}

const myLibrary = () => {
    const myBooks = [];

    const addToLibrary = (book) => {
        myBooks.push(book);
        const bookIndex = myBooks.length - 1;
        console.log('myBooks', myBooks, 'length', myBooks.length, 'bookIndex', bookIndex);
        const bookCard = document.createElement('div');
        bookCard.className = 'card';
        bookCard.dataset.index = bookIndex;

        const bookTitle = document.createElement('div');
        bookTitle.textContent = 'Title: ' + book.title;

        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = 'Author: ' + book.author;

        const statusToggle = document.createElement('button');
        book.has_read == 'yes' ? statusToggle.textContent = 'Mark as unread' : statusToggle.textContent = 'Mark as read';
        // statusToggle.dataset.index = bookIndex;
        statusToggle.addEventListener('click', toggleStatus);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        // deleteButton.dataset.index = bookIndex;
        deleteButton.addEventListener('click', deleteFromLibrary);
        
        const hasRead = document.createElement('div');
        book.has_read === 'yes' ? hasRead.textContent = 'Completed' : hasRead.textContent = 'Not completed';
        hasRead.className = 'has-read';
        
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(hasRead);
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(statusToggle);
        pageContainer.appendChild(bookCard);
        console.log('updated myBooks', myBooks);
    };

    const deleteFromLibrary = (e) => {
        // fix this, currently it only deletes in reverse order
        console.log('e.target.dataset.index', e.target.parentElement.dataset.index);
        console.log('delete parentElement', e.target.parentElement);
        myBooks.splice(e.target.parentElement.dataset.index, 1);
        e.target.parentElement.remove();
        
        const bookCards = document.querySelectorAll('div.card');
        let bookIndex = 0;
        bookCards.forEach((bookCard) => {
            bookCard.dataset.index = bookIndex;
            console.log('bookCard', bookCard, 'index', bookCard.dataset.index);
            bookIndex++;
        })
        console.log('updated myBooks', myBooks);
    };

    const toggleStatus = (e) => {
        console.log('e.target.parentElement.dataset.index',  e.target.parentElement.dataset.index);
        console.log('myBooks', myBooks);

        const selectedBook = myBooks[parseInt(e.target.parentElement.dataset.index)];
        console.log('selectedBook'. selectedBook, 'has read?', selectedBook.has_read);
        const hasReadIndicator = e.target.parentElement.querySelector('.has-read');
        const statusToggleButton = e.target;

        selectedBook.has_read === 'yes' ? (
            console.log('toggle read => not read'),
            selectedBook.has_read = 'no',
            hasReadIndicator.textContent = 'Not completed',
            statusToggleButton.textContent = 'Mark as read'
        ) : 
        selectedBook.has_read === 'no' ? (
            console.log('toggle not read => read'),
            selectedBook.has_read = 'yes',
            hasReadIndicator.textContent = 'Completed',
            statusToggleButton.textContent = 'Mark as unread'
        ) : 'something went wrong';

        console.log('updated myBooks', myBooks);
    };

    newBookButton.addEventListener('click', ((e) => {
        console.log('add a book');
        newBookDialog.showModal();
    }));
    
    newBookForm.addEventListener('submit', ((e) => {
        // select form inputs
        const newBookTitle = document.querySelector('input#title');
        const newBookAuthor = document.querySelector('input#author');
        const hasRead = document.querySelector('input#has_read');
        
        const newBook = new Book(newBookTitle.value, newBookAuthor.value, hasRead.checked ? "yes" : "no");
        addToLibrary(newBook);
    
        // clear form inputs
        newBookTitle.value = '';
        newBookAuthor.value = '';
        hasRead.value = '';
    }));
}

myLibrary();