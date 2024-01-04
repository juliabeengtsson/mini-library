var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books;
const fetchTodos = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error('failed to load data');
        }
        const data = yield response.json();
        books = data;
        appendContent();
        console.log(data);
    }
    catch (error) {
        console.error('Network Error:', error);
    }
});
fetchTodos();
const appendContent = () => {
    let libraryContainer = document.querySelector('.books');
    if (libraryContainer === null) {
        console.error("Could not find element with class 'books'");
        return;
    }
    books.forEach((element) => {
        let bookItem = document.createElement('div');
        let bookTitle = document.createElement('h5');
        let authorTitle = document.createElement('p');
        bookTitle.textContent = element.title;
        authorTitle.textContent = element.author;
        bookItem.append(bookTitle, authorTitle);
        bookItem.dataset.book = JSON.stringify(element);
        libraryContainer.append(bookItem);
        let bookInfo = document.querySelector('.info-container');
        bookInfo.style.display = 'none';
        // Ger varje bok en indivudella css-klass
        bookItem.classList.add(`book-${element.id}`);
        bookTitle.classList.add(`book-title`);
        authorTitle.classList.add(`book-author`);
        bookItem.addEventListener('click', () => {
            let clickedBook = element;
            console.log(clickedBook);
            let bookItemCopy = bookItem.cloneNode(true); // Typomvandling behövs eftersom cloneNode() returnerar Node.
            showBook(bookItemCopy, clickedBook);
        });
    });
};
// Void betyder att funktionen inte ska retunera något.
const showBook = (bookItemCopy, clickedBook) => {
    let bookInfoOverlay = document.createElement('div');
    bookInfoOverlay.classList.add('overlay');
    document.body.append(bookInfoOverlay);
    let bookInfo = document.querySelector('.info-container');
    bookInfo.style.display = 'flex';
    bookInfoOverlay.append(bookInfo);
    let bookCover = document.querySelector('.book-cover');
    bookCover.append(bookItemCopy);
    bookItemCopy.classList.add('bookItemCopy');
    let infoTitle = document.querySelector('.info-title');
    infoTitle.textContent = clickedBook.title;
    let infoSubtitle = document.querySelector('.info-subtitle');
    infoSubtitle.textContent = 'By ' + clickedBook.author;
    let textParagraph = document.querySelector('.info-paragraph');
    textParagraph.textContent = clickedBook.plot;
    let audience = document.querySelector('.audience');
    audience.textContent = 'Audience: ' + clickedBook.audience;
    let firstPublished = document.querySelector('.first-published');
    firstPublished.textContent = 'First published: ' + clickedBook.year;
    let pages = document.querySelector('.pages');
    pages.textContent = 'Pages: ' + clickedBook.pages;
    let publisher = document.querySelector('.publisher');
    publisher.textContent = 'Publisher: ' + clickedBook.publisher;
    /*let resetBtn: HTMLElement = document.querySelector('.reset-btn');

    resetBtn.addEventListener('click', () => {
        bookInfoOverlay.style.display = 'none';
    }) */
};
