const openModal = document.querySelector('.add');
const modalContainer = document.querySelector('.modal-container');
const gridContainer = document.querySelector('.grid-container');

const form = document.querySelector('#form');
const formTitle = document.querySelector('#formTitle');
const formAuthor = document.querySelector('#formAuthor');
const formPages = document.querySelector('#formPages');
const formIsRead = document.querySelector('#formIsRead');
const inputs = document.querySelectorAll('input');

const submitBtn = document.querySelector('#submitBtn');

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.read = function(btn, obj) {
    btn.addEventListener('click', e => {
        if(obj.isRead) {
            obj.isRead = false;
            btn.classList.remove('read')
            btn.classList.add('notRead')
            btn.innerHTML = 'Not Read';
        } else {
            obj.isRead = true;
            btn.classList.remove('notRead');
            btn.classList.add('read');
            btn.innerHTML = 'Read';
        }
        console.log(obj.isRead);
    });
}

openModal.addEventListener('click', () => {
    modalContainer.classList.add('show');
});

modalContainer.addEventListener('click', e => {
    if(e.target !== e.currentTarget) return; // this doesnt make the child clickable(modal)
    modalContainer.classList.remove('show');
});

function removeBook(btn, book) {
    btn.addEventListener('click', e => {
        myLibrary.splice(e.target.id, 1);
        console.log(myLibrary);
    });
    
}

function showBoxes(b, i) {
    
    const box = document.createElement('div');
    box.dataset.id = i;
    const pTitle = document.createElement('p');
    const pAuthor = document.createElement('p');
    const pPages = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    box.classList.add('box');
    pTitle.classList.add('title');
    pAuthor.classList.add('author');
    pPages.classList.add('numPages');
    readBtn.classList.add('readBtn', 'btn');
    removeBtn.classList.add('removeBtn', 'btn');

    if(b.isRead) {
        readBtn.classList.add('read');
        readBtn.innerHTML = 'Read';
    } else {
        readBtn.classList.add('notRead')
        readBtn.innerHTML = 'Not Read';
    }

    removeBtn.innerHTML = 'Remove';

    console.log(pTitle);
    pTitle.innerHTML = b.title;
    pAuthor.innerHTML = b.author;
    pPages.innerHTML = b.pages;

    box.append(pTitle, pAuthor, pPages, readBtn, removeBtn);
    gridContainer.append(box);

    b.read(readBtn, b);
    removeBook(removeBtn, b)
}

form.addEventListener('submit', e => {
    e.preventDefault();

    let book = new Book(formTitle.value, formAuthor.value, formPages.value, formIsRead.checked);
    myLibrary.push(book);

    inputs.forEach(i => i.value = '');
    modalContainer.classList.remove('show');

    showBoxes(book, myLibrary.indexOf(book));
});