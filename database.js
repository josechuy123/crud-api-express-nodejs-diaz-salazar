const mysql = require('mysql');



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sistema_web',
});

module.exports = db;
