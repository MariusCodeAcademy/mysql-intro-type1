require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
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
    VALUES ('Jane', 'Second post of Jane')
    `;
    const [rows, fields] = await connection.query(sql);
    console.log(rows, fields);
  };
  // await addRowToPost();

  const getPosts = async () => {
    const sql = 'SELECT * FROM `posts`';
    const [rows, fields] = await connection.query(sql);
    console.log('rows', rows);
    // console.log('fields', fields);
  };
  // await getPosts();

  const getPostsFrom = async (owner) => {
    const sql = `SELECT * FROM posts WHERE author = '${owner}'`;
    const [rows, fields] = await connection.query(sql);
    console.log('rows', rows);
    // console.log('fields', fields);
  };
  await getPostsFrom('James Bond');

  await connection.end();
};

init();
