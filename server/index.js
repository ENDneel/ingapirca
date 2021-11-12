const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const {mongoose} = require('./database')

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

//Routes
app.use('/reserva',require('./routes/reserva.routes'));
app.use('/noticia',require('./routes/noticia.routes'));
app.use('/reservaUsuario',require('./routes/reservaUsuario.routes'));
app.use('/usuario',require('./routes/usuario.routes'));
app.use('/reservaAdministrador',require('./routes/reservaAdministrador.routes'));
app.use('/admin',require('./routes/admin.routes'));

//Staring the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})