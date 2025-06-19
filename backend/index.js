
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'database-2.cxmu6gksksr8.eu-north-1.rds.amazonaws.com',
  user: 'admin',
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

// 상품 목록 조회
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM 상품정보', (err, results) => {
    if (err) {
      console.error('상품 조회 실패:', err);
      return res.status(500).json({ error: '상품 조회 실패' });
    }
    res.json(results);
  });
});

// 상품 등록
app.post('/api/products', (req, res) => {
  const {
    상품코드, 상품명, 수량, 입고일,
    권장소비자가, 소비기한, 현장가, 판매단위, 매입가
  } = req.body;

  const sql = `
    INSERT INTO 상품정보
    (상품코드, 상품명, 수량, 입고일, 권장소비자가, 소비기한, 현장가, 판매단위, 매입가)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [
    상품코드, 상품명, 수량, 입고일,
    권장소비자가, 소비기한, 현장가, 판매단위, 매입가
  ], (err, result) => {
    if (err) {
      console.error('상품 등록 실패:', err);
      return res.status(500).json({ error: '상품 등록 실패' });
    }
    res.status(201).json({ message: '상품 등록 완료', id: result.insertId });
  });
});

// 상품 수정
app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const updated = req.body;

  const fields = Object.keys(updated).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updated);

  connection.query(
    `UPDATE 상품정보 SET ${fields} WHERE 상품코드 = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        console.error('상품 수정 실패:', err);
        return res.status(500).json({ error: '상품 수정 실패' });
      }
      res.json({ message: '상품 수정 완료' });
    }
  );
});

// 상품 삭제
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;

  connection.query(
    'DELETE FROM 상품정보 WHERE 상품코드 = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('상품 삭제 실패:', err);
        return res.status(500).json({ error: '상품 삭제 실패' });
      }
      res.json({ message: '상품 삭제 완료' });
    }
  );
});

app.listen(port, () => {
  console.log(`🎉 백엔드 서버가 정상적으로 작동 중입니다! http://localhost:${port}`);
});
