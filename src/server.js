require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mysql = require('mysql2');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
};

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/create-table', function (req, res) {
  // ivygdyti naujos lenteles sukurimo koda
});

app.post('/api/new', function (req, res) {
  // const { author, text } = req.body;
  const author = req.body.author;
  const text = req.body.text;
  console.log('body we got to /api/new');
  // ivygdyti naujos lenteles sukurimo koda
  // prisijungti prie db
  const conn = mysql.createConnection(dbConfig);
  // atslikti veiksma
  const sql = `
    INSERT INTO posts(author, body)
    VALUES (?, ?)
    `;
  conn.execute(sql, [author, text], (err, result) => {
    if (err) {
      // ivyko klaida
      res.status(500).json({ msg: 'fail' });
    } else {
      console.log('irasas sukurtas', result);
      res.json({ msg: 'success' });
    }
  });
  // uzdaryti connection
  conn.end();
});

// GET /posts
app.get('/posts', (req, res) => {
  // prisijungti prie DB
  const conn = mysql.createConnection(dbConfig);
  // Parasyti uzklausa gauti visus reikalingus duomenis
  const sql = 'SELECT * FROM posts';
  // ivygdyti uzklausa
  conn.query(sql, (err, result) => {
    if (!err) {
      console.log('result', result);
      res.json({ msg: 'success', posts: result });
    } else {
      res.json({ msg: 'fail' });
    }
  });

  // siusi json pavidalu uzklausos rezultatus

  // uzdaryti prisijungima
  conn.end();
});

app.listen(3000, console.log('server running'));
