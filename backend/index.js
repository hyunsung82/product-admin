const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
  host: 'your-rds-endpoint',
  user: 'admin',
  password: 'your-password',
  database: 'productdb'
});

app.get('/products', (req, res) => {
  conn.query('SELECT * FROM 상품정보', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
