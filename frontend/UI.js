import BookService from './services/BookService';
import { format } from 'timeago.js'
const bookService = new BookService();
// clase que se encaga del evento del formulario
class UI {

    async renderBooks() {
        //metodo para visualizar los elementos del localhost:3000 como tarjetas de informacion
        const books = await bookService.getBooks();
        //  captura el elemento de la vista books-cards
        const booksCardConteiner = document.getElementById('books-cards');

        booksCardConteiner.innerHTML = '';
        // llmado a elementos con un string desde el metodo render hacia app-js  
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:3000/${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardConteiner.appendChild(div);
        });
    }

    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    // metodo para dar funcionalidad a los mensajes en la vista
    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        // se crea la barra para el mednsaje
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        // el elemtno se coloca encima del formulario y debajo de la navegacion de las tarjetas
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm);

        setTimeout(() => {
            // remueve el mensaje insertado encima del formulario despues de unos segundos
            document.querySelector('.message').remove();
        }, secondsToRemove);

    }

    async deleteBook(bookId) {
        // funcion flecha para obetener el evento clic  en la vista
        await bookService.deleteBook(bookId);
        // al ejecutarse el metodo delete llama al render para actualizar la vista
        // sin volver a cargar la pagina
        this.renderBooks();
    }
}

export default UI;