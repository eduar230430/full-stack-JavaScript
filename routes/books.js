// enrutador para definir las rutas del servidor
const { Router } = require('express')
const router = Router();
//modulo para eliminar elementos con promesas filesystem
const { unlink } = require('fs-extra');
const path = require('path');
const Book = require('../models/Book');


// envio de mensaje desde la ruta hacia el cliente
//router.get('/', (req, res) => res.json({ text: 'hello  world' }))

router.get('/', async(req, res) => {
    const books = await Book.find();
    res.json(books);
});

// instancia para el libro a guardar
router.post('/', async(req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({ title, author, isbn, imagePath });
    await newBook.save();
    res.json({ message: 'Book saved' });
});

// metodo para eliminarl un libro 
router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    // metodo que elmina las images con fsunlink del backend en nuestro servidor 3000
    unlink(path.resolve('./backend/public' + book.imagePath));
    console.log(book);
    res.send({ message: 'Book deleted' });
});


module.exports = router;