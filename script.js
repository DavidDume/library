const openModal = document.querySelector('.add');
const modalContainer = document.querySelector('.modal-container');

const submitBtn = document.querySelector('#submitBtn');

openModal.addEventListener('click', () => {
    modalContainer.classList.add('show');
});

submitBtn.addEventListener('click', e => {
    modalContainer.classList.remove('show'); //only if form is valid!!
});