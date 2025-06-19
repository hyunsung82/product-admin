const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('DB 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});

app.get('/', (req, res) => {
  res.send('🎉 백엔드 서버가 정상적으로 작동 중입니다!');
});

app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM 상품정보', (err, results) => {
    if (err) {
      console.error('상품 조회 실패:', err);
      res.status(500).json({ error: 'DB 오류' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});