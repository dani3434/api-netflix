const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const database = require('./src/services/database');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;

const filmeRoutes = require('./src/routes/main.routes');
const loginRoutes = require('./src/routes/usuarios.routes');
const episodiosRoutes = require('./src/routes/episodios.routes');

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/', filmeRoutes);
app.use('/usuario', loginRoutes);
app.use('/episodio', episodiosRoutes);

app.listen(PORT, () => {
  console.log('Meu servidor está funcionando');
});