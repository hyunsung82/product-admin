
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'database-2.cxmu6gksksr8.eu-north-1.rds.amazonaws.com',
  user: 'g9store',
  password: 'Lastpick12',
  database: 'productdb'
});

connection.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 연결 성공!');
});

app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM 상품정보', (err, results) => {
    if (err) {
      console.error('쿼리 오류:', err);
      return res.status(500).json({ error: 'DB 오류' });
    }
    console.log('쿼리 성공, 결과 전송 중...');
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🎉 백엔드 서버가 정상적으로 작동 중입니다! http://localhost:${port}`);
});
