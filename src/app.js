const dbConfig = {
  host: 'sql11.freesqldatabase.com',
  user: 'sql11440279',
  password: 'MB9ysyYm9r',
  port: '3306',
  database: 'sql11440279',
};

const init = async () => {
  const mysql = require('mysql2/promise');
  // create the connection to database
  connection = await mysql.createConnection(dbConfig);
  console.log('connection success');

  const createTable = async () => {
    let sql = `
  CREATE TABLE posts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      author VARCHAR(20) NOT NULL,
      body TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
  `;
    const [rows, fields] = await connection.query(sql);
    console.log(rows, fields);
  };

  const addRowToPost = async () => {
    const sql = `
    INSERT INTO posts(author, body)
    VALUES ('James Bond', 'Firs post of James')
    `;
    const [rows, fields] = await connection.query(sql);
    console.log(rows, fields);
  };
  await addRowToPost();

  await connection.end();
};

init();
