require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    // coloca los archivos de visualizacion dentro del path señalado
    destination: path.join(__dirname, 'public/uploads'),
    //elementos necesarios para recibi el archivo desde el cliente request, file, cb
    filename(req, file, cb) {
        // archivo con la fecha concatenada  a su extension
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

// multer supervisa desde el front end el archivo que se pueda subir
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes API
app.use('/api/books', require('./routes/books'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'))
})