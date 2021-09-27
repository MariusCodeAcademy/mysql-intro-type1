const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/create-table', function (req, res) {
  // ivygdyti naujos lenteles sukurimo koda
});

app.post('/api/new', function (req, res) {
  const body = req.body;
  console.log('body we got to /api/new', body);
  // ivygdyti naujos lenteles sukurimo koda
});

app.listen(3000, console.log('server running'));
