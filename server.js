const express = require('express');
const path = require('path');
const mysql = require('mysql');
//const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sistema_web',
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Base conectada!....');
  }
});
//Definir routes
app.use('/', require('./routes/paginas'));

//escuchando en el puerto
app.listen(3000, () => {
  console.log('Server iniciado en puerto 3000');
});
