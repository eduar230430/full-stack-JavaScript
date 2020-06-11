import './styles/app.css';
import BookService from './services/BookService';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});

document.getElementById('book-form').addEventListener('submit', e => {
    // obtengo los elementos desde la vista
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    //console.log(title, author, isbn, image);

    // guarda los elementos capturados desde la vista 
    const formData = new FormData();

    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI();
    ui.addNewBook(formData)
    ui.renderMessage('New Book Added', 'success', 3000);
    e.preventDefault();
});

document.getElementById('books-cards')
    .addEventListener('click', e => {
        // cuando el evento 'e' tenga un id con delete entonces se ejecuta
        if (e.target.classList.contains('delete')) {
            // obtienen el elemento id de la etiqueta <a>
            //console.log(e.target.getAttribute('_id'));
            const id = e.target.getAttribute('_id');
            console.log(id);

            const ui = new UI();
            ui.deleteBook(id);
            ui.renderMessage('Book Deleted', 'danger', 2000);
        }
    });