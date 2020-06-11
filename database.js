const mongoose = require('mongoose');
//variable de entorno para la nocexion a la base de datos
process.env.MONGODB_URI

/*mongoose.connect('mongodb://localhost/javascriptdb', {
        useNewUrlParser: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))
*/
// actualizacion para la conexion a la base de datos con mongodb!!
mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
    });