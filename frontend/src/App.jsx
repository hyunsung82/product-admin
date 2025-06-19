import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">상품 목록</h1>
      <table className="w-full border">
        <thead>
          <tr>
            {products[0] &&
              Object.keys(products[0]).map((key) => (
                <th key={key} className="border p-2 bg-gray-200">{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.상품코드}>
              {Object.values(p).map((val, idx) => (
                <td key={idx} className="border p-2">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
