require('dotenv').config();

const mysql = require('mysql2');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
};

const conn = mysql.createConnection(dbConfig);
let sql;
sql = 'SELECT * FROM posts';
// prepared statment
sql = 'SELECT * FROM posts WHERE author = ? AND id < ?';

conn.execute(sql, ['Jane', 5], (err, result) => {
  if (err) throw err;
  console.log('result', result);
});

// paimti ivesties duomenis ir suskurti nauja irasa

conn.end();
