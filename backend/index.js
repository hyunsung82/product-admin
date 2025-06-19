const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 여기를 실제 RDS 정보로 수정
const connection = mysql.createConnection({
  host: 'database-2.cxmu6gksksr8.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Lastpick12',
  database: 'productdb'
});

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM 상품정보', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
