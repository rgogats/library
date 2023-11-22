// library app for The Odin Project
const pageContainer = document.querySelector('.page-container');
const newBookButton = document.querySelector('button.add');
const newBookDialog = document.querySelector('dialog');
const newBookForm = document.querySelector('form#save_book');


function Book(id, title, author, has_read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.has_read = has_read;
}

const myLibrary = () => {
    const myBooks = [];

    const addToLibrary = (book) => {
        myBooks.push(book);
        const bookCard = document.createElement('div');
        bookCard.className = 'card';
        // bookCard.dataset.index = myBooks.length;
        // console.log('dataset.index', bookCard.dataset.index);

        const bookTitle = document.createElement('div');
        bookTitle.textContent = 'Title: ' + book.title;

        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = 'Author: ' + book.author;

        const hasRead = document.createElement('div');
        const statusToggle = document.createElement('button');
        book.has_read == 'yes' ? statusToggle.textContent = 'Mark as unread' : statusToggle.textContent = 'Mark as read';
        statusToggle.dataset.index = myBooks.length;
        statusToggle.addEventListener('click', toggleStatus);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.index = myBooks.length;
        deleteButton.addEventListener('click', deleteFromLibrary);

        book.has_read === 'yes' ? hasRead.textContent = 'Completed' : hasRead.textContent = 'Not completed';
        
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(hasRead);
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(statusToggle);
        pageContainer.appendChild(bookCard);
    };

    const deleteFromLibrary = (e) => {
        // fix this, currently it only deletes in reverse order
        console.log('e.target.dataset.index', e.target.dataset.index);
        myBooks.splice(e.target.dataset.index - 1, 1);
        console.log(myBooks);
        refreshDisplay();
    };

    const toggleStatus = (e) => {
        console.log('e.target.dataset.index',  e.target.dataset.index);
        console.log('selected book', myBooks[e.target.dataset.index - 1]);
        myBooks[e.target.dataset.index - 1].has_read == 'yes' ? 'no' : 'yes';
        console.log(myBooks);
        // refreshDisplay();
    };

    const refreshDisplay = () => {
        const currentBooksDisplayed = document.querySelectorAll('.card');
        for (currentBook of currentBooksDisplayed) {
            console.log(currentBook);
        }
    }

    // const refreshLibrary = () => {
        while (pageContainer.firstChild) {
            pageContainer.removeChild(pageContainer.lastChild);
        }

    //     for (book of myBooks) {
            // const bookCard = document.createElement('div');
            // bookCard.className = 'card';
    //         // bookCard.dataset.index = myBooks.length;
    //         // console.log('dataset.index', bookCard.dataset.index);

    //         const bookTitle = document.createElement('div');
    //         bookTitle.textContent = 'Title: ' + book.title;

    //         const bookAuthor = document.createElement('div');
    //         bookAuthor.textContent = 'Author: ' + book.author;

    //         const hasRead = document.createElement('div');
    //         const statusToggle = document.createElement('input');
    //         statusToggle.type = 'checkbox';
    //         statusToggle.addEventListener('click', toggleStatus);
            
    //         const deleteButton = document.createElement('button');
    //         deleteButton.textContent = 'Delete';
    //         deleteButton.addEventListener('click', deleteFromLibrary);

            
            
    //         book.has_read === 'yes' ? hasRead.textContent = 'Completed' : hasRead.textContent = 'Not completed';
            
    //         bookCard.appendChild(bookTitle);
    //         bookCard.appendChild(bookAuthor);
    //         bookCard.appendChild(hasRead);
    //         bookCard.appendChild(deleteButton);
    //         bookCard.appendChild(statusToggle);
    //         pageContainer.appendChild(bookCard);
    //     }
    // };

    newBookButton.addEventListener('click', ((e) => {
        console.log('clicked new');
        newBookDialog.showModal();
    }));
    
    newBookForm.addEventListener('submit', ((e) => {
        // select form inputs
        const newBookTitle = document.querySelector('input#title');
        const newBookAuthor = document.querySelector('input#author');
        const hasRead = document.querySelector('input#has_read');
        
        const newBook = new Book(myBooks.length + 1, newBookTitle.value, newBookAuthor.value, hasRead.checked ? "yes" : "no");
        addToLibrary(newBook);
        console.log(myBooks);
        // refreshLibrary();
    
        // clear form inputs
        newBookTitle.value = '';
        newBookAuthor.value = '';
        hasRead.value = '';
    }));
}

myLibrary();