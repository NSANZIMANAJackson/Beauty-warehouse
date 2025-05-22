import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import CreateProduct from './createProduct';
import Error from '../notification/error';
import Success from '../notification/success';

const Products = () => {
  const [rows, setRows] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  async function getProducts() {
    try {
      const { data: { rows } } = await axios.get('http://localhost:3000/api/v1/products');
      setRows(rows);
    } catch (error) {
      const { response: { data: { msg } } } = error;
      setIsError(true);
      setMessage(msg);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`/products/${id}`);
      setMessage(data);
      setIsSuccess(true);
      setIsError(false);
      getProducts(); // Refresh
    } catch (error) {
      const { response: { data: { msg } } } = error;
      setIsError(true);
      setMessage(msg);
    }
  }

  const handleEditClick = (product) => {
    setEditRowId(product.product_id);
    setEditedData({ ...product });
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedData({});
  };

  const handleSaveEdit = async () => {
    try {
      const { product_id, product_name, stock_kg, price_kg } = editedData;
      const { data: { msg } } = await axios.patch(`/products/${product_id}`, {
        product_name,
        stock_kg,
        price_kg
      });
      setMessage(msg);
      setIsSuccess(true);
      setIsError(false);
      setEditRowId(null);
      getProducts(); // Refresh
    } catch (error) {
      const { response: { data: { msg } } } = error;
      setIsError(true);
      setMessage(msg);
    }
  };

  return (
    <div>
      <header className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold mb-2">Product Inventory:</h1>
        <form action="" className="flex flex-row justify-start">
          <input type="search" placeholder="search product..." className="p-1" />
        </form>
      </header>
      <hr />
      {isError && <Error msg={message} />}
      {isSuccess && <Success msg={message} />}

      <section className="flex flex-col mt-6">
        <button
          type="button"
          onClick={() => setIsNewProduct(true)}
          className="text-left text-lg flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2 w-1/5 cursor-pointer hover:bg-[#143337]"
        >
          Create New Product
        </button>
        {isNewProduct && <CreateProduct />}

        {/* Table */}
        <table className="w-full border-collapse text-center">
          <thead className="text-lg">
            <tr>
              <th>#Product ID</th>
              <th>Name</th>
              <th>Stock (kg)</th>
              <th>Price (per kg)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {rows.map((row) => (
              <tr key={row.product_id} className="odd:bg-white">
                <td>{row.product_id}</td>

                <td>
                  {editRowId === row.product_id ? (
                    <input
                      name="product_name"
                      value={editedData.product_name}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                    />
                  ) : (
                    row.product_name
                  )}
                </td>

                <td>
                  {editRowId === row.product_id ? (
                    <input
                      name="stock_kg"
                      value={editedData.stock_kg}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                      type="number"
                    />
                  ) : (
                    row.stock_kg
                  )}
                </td>

                <td>
                  {editRowId === row.product_id ? (
                    <input
                      name="price_kg"
                      value={editedData.price_kg}
                      onChange={handleEditChange}
                      className="border p-1 w-full"
                      type="number"
                    />
                  ) : (
                    row.price_kg
                  )}
                </td>

                <td className="flex justify-evenly">
                  {editRowId === row.product_id ? (
                    <>
                      <button onClick={handleSaveEdit} className="text-green-600 font-medium">
                        Save
                      </button>
                      <button onClick={handleCancelEdit} className="text-gray-600 font-medium">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(row)}>
                        <span className="material-symbols-outlined text-green-600">edit</span>
                      </button>
                      <button onClick={() => handleDelete(row.product_id)}>
                        <span className="material-symbols-outlined text-red-600">delete</span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Products;
