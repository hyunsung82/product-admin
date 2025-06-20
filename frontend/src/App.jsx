
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', expiration: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const API_URL = 'https://product-admin-1-lfaz.onrender.com/api/products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = () => {
    axios.post(API_URL, newProduct)
      .then(() => {
        setNewProduct({ name: '', price: '', expiration: '' });
        fetchProducts();
      });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => fetchProducts());
    }
  };

  const handleUpdateProduct = () => {
    axios.put(`${API_URL}/${editingProduct._id}`, editingProduct)
      .then(() => {
        setEditingProduct(null);
        fetchProducts();
      });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">상품 목록</h1>

      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">신규 상품 추가</h2>
        <input
          name="name"
          placeholder="상품명"
          value={newProduct.name}
          onChange={handleInputChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          name="price"
          placeholder="가격"
          value={newProduct.price}
          onChange={handleInputChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          name="expiration"
          placeholder="소비기한 (YYYY-MM-DD)"
          value={newProduct.expiration}
          onChange={handleInputChange}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-1 rounded">등록</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">상품명</th>
            <th className="p-2 border">가격</th>
            <th className="p-2 border">소비기한</th>
            <th className="p-2 border">관리</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            editingProduct && editingProduct._id === product._id ? (
              <tr key={product._id}>
                <td className="p-2 border">
                  <input name="name" value={editingProduct.name} onChange={(e) => handleInputChange(e, true)} className="border px-2 py-1" />
                </td>
                <td className="p-2 border">
                  <input name="price" value={editingProduct.price} onChange={(e) => handleInputChange(e, true)} className="border px-2 py-1" />
                </td>
                <td className="p-2 border">
                  <input name="expiration" value={editingProduct.expiration} onChange={(e) => handleInputChange(e, true)} className="border px-2 py-1" />
                </td>
                <td className="p-2 border">
                  <button onClick={handleUpdateProduct} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">저장</button>
                  <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-2 py-1 rounded">취소</button>
                </td>
              </tr>
            ) : (
              <tr key={product._id}>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.price}</td>
                <td className="p-2 border">{product.expiration?.split('T')[0]}</td>
                <td className="p-2 border">
                  <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">수정</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">삭제</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}
