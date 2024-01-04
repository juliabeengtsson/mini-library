const url: string = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books: Book[];

const fetchTodos = async (): Promise<void> => {
    try {
        const response: Response = await fetch(url);
        if(!response.ok) {
            throw new Error('failed to load data')
        }
        const data: Book[] = await response.json();
        books = data;

        appendContent();
    
        console.log(data)
    } catch(error: any) {
        console.error('Network Error:', error);
    }
}
fetchTodos();

interface Book {
    id: number,
    audience: string,
    author: string,
    pages: number,
    title: string,
    year: number,
    plot?: string,
    publisher: string,
}

const appendContent = () : void => {
    let libraryContainer: HTMLElement | null = document.querySelector('.books');

    if(libraryContainer === null) {
        console.error("Could not find element with class 'books'");
        return;
    }

    books.forEach((element: Book) => {
        let bookItem: HTMLElement = document.createElement('div');
        let bookTitle: HTMLElement = document.createElement('h5');
        let authorTitle: HTMLElement = document.createElement('p');

        bookTitle.textContent = element.title;
        authorTitle.textContent = element.author;

        bookItem.append(bookTitle, authorTitle);

        bookItem.dataset.book = JSON.stringify(element);

        libraryContainer.append(bookItem);

        let bookInfo: HTMLElement = document.querySelector('.info-container');
        bookInfo.style.display = 'none';

        // Ger varje bok en indivudella css-klass
        bookItem.classList.add(`book-${element.id}`);
        bookTitle.classList.add(`book-title`);
        authorTitle.classList.add(`book-author`);

        bookItem.addEventListener('click', (): void => {
            let clickedBook: Book = element;
            console.log(clickedBook)
            let bookItemCopy: HTMLElement = <HTMLElement>bookItem.cloneNode(true); // Typomvandling behövs eftersom cloneNode() returnerar Node.
            showBook(bookItemCopy, clickedBook);
        })
    });
}

// Void betyder att funktionen inte ska retunera något.
const showBook = (bookItemCopy: HTMLElement, clickedBook: Book): void => {
    let bookInfoOverlay: HTMLElement = document.createElement('div');
    bookInfoOverlay.classList.add('overlay');

    document.body.append(bookInfoOverlay);

    let bookInfo: HTMLElement = document.querySelector('.info-container');
    bookInfo.style.display = 'flex';
    bookInfoOverlay.append(bookInfo)
    
    let bookCover: HTMLElement = document.querySelector('.book-cover');
    bookCover.append(bookItemCopy);
    bookItemCopy.classList.add('bookItemCopy');

    let infoTitle: HTMLElement = document.querySelector('.info-title');
    infoTitle.textContent = clickedBook.title;

    let infoSubtitle: HTMLElement = document.querySelector('.info-subtitle');
    infoSubtitle.textContent = 'By ' + clickedBook.author;

    let textParagraph: HTMLElement = document.querySelector('.info-paragraph');
    textParagraph.textContent = clickedBook.plot;

    let audience: HTMLElement = document.querySelector('.audience');
    audience.textContent = 'Audience: ' + clickedBook.audience;

    let firstPublished: HTMLElement = document.querySelector('.first-published');
    firstPublished.textContent = 'First published: ' + clickedBook.year;

    let pages: HTMLElement = document.querySelector('.pages');
    pages.textContent = 'Pages: ' + clickedBook.pages;

    let publisher: HTMLElement = document.querySelector('.publisher');
    publisher.textContent = 'Publisher: ' + clickedBook.publisher;

    /*let resetBtn: HTMLElement = document.querySelector('.reset-btn');

    resetBtn.addEventListener('click', () => {
        bookInfoOverlay.style.display = 'none';
    }) */
}