import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import CreateOrder from './createOrder';
import Success from '../notification/success';
import Error from '../notification/error';

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ product_id: '', customer_id: '', quantity: '' });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isNewOrder, setIsNewOrder] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const { data: { rows } } = await axios.get('/orders');
      console.log(rows);
      setRows(rows);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.msg || 'Error fetching orders');
      setIsError(true);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`/orders/${id}`);
      setMessage(data);
      setIsSuccess(true);
      setIsError(false);
      getOrders();
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error deleting order');
      setIsError(true);
    }
  }

  async function handleUpdate(id) {
    try {
      const { data } = await axios.put(`/orders/${id}`, editData);
      setMessage(data);
      setIsSuccess(true);
      setIsError(false);
      setEditingId(null);
      getOrders();
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error updating order');
      setIsError(true);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Orders List</h1>
      {isError && <Error msg={message} />}
      {isSuccess && <Success msg={message} />}

      <section className="flex flex-col mt-6">
        <button
          type="button"
          onClick={() => setIsNewOrder(!isNewOrder)}
          className="text-left text-lg flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2 w-1/5 cursor-pointer hover:bg-[#143337]"
        >
          {isNewOrder ? 'Hide Form' : 'Add Order'}
        </button>

        {isNewOrder && <CreateOrder />}

        <table className="w-full text-center mt-4 border-collapse">
          <thead className="text-lg">
            <tr>
              <th>#Order ID</th>
              <th>Product ID</th>
              <th>Customer ID</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {rows.map((row) => (
              <tr key={row.order_id} className="odd:bg-white">
                <td>{row.order_id}</td>
                <td>
                  {editingId === row.order_id ? (
                    <input
                      name="product_id"
                      value={editData.product_id}
                      onChange={e => setEditData({ ...editData, product_id: e.target.value })}
                    />
                  ) : (
                    row.product_id
                  )}
                </td>
                <td>
                  {editingId === row.order_id ? (
                    <input
                      name="customer_id"
                      value={editData.customer_id}
                      onChange={e => setEditData({ ...editData, customer_id: e.target.value })}
                    />
                  ) : (
                    row.customer_id
                  )}
                </td>
                <td>
                  {editingId === row.order_id ? (
                    <input
                      name="quantity"
                      value={editData.quantity}
                      onChange={e => setEditData({ ...editData, quantity: e.target.value })}
                    />
                  ) : (
                    row.quantity
                  )}
                </td>
                <td className="flex justify-evenly">
                  {editingId === row.order_id ? (
                    <button onClick={() => handleUpdate(row.order_id)}>
                      <span className="material-symbols-outlined text-green-600">save</span>
                    </button>
                  ) : (
                    <button onClick={() => {
                      setEditingId(row.order_id);
                      setEditData({ product_id: row.product_id, customer_id: row.customer_id, quantity: row.quantity });
                    }}>
                      <span className="material-symbols-outlined text-green-600">edit</span>
                    </button>
                  )}
                  <button onClick={() => handleDelete(row.order_id)}>
                    <span className="material-symbols-outlined text-red-600">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Orders;
