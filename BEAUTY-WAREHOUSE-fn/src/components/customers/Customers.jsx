import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import CreateCustomer from './createCustomer';
import Success from '../notification/success';
import Error from '../notification/error';

const Customers = () => {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ customer_name: '', customer_email: '' });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    try {
      const { data: { rows } } = await axios.get('/customers');
      setRows(rows);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error fetching customers');
      setIsError(true);
    }
  }

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`/customers/${id}`);
      setMessage(data);
      setIsSuccess(true);
      setIsError(false);
      getCustomers();
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error deleting customer');
      setIsError(true);
    }
  }

  async function handleUpdate(id) {
    try {
      const { data } = await axios.put(`/customers/${id}`, editData);
      setMessage(data);
      setIsSuccess(true);
      setIsError(false);
      setEditingId(null);
      getCustomers();
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error updating customer');
      setIsError(true);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Customers List</h1>
      {isError && <Error msg={message} />}
      {isSuccess && <Success msg={message} />}

      <section className="flex flex-col mt-6">
        <button
          type="button"
          onClick={() => setIsNewCustomer(!isNewCustomer)}
          className="text-left text-lg flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2 w-1/5 cursor-pointer hover:bg-[#143337]"
        >
          {isNewCustomer ? 'Hide Form' : 'Add Customer'}
        </button>

        {isNewCustomer && <CreateCustomer />}

        <table className="w-full text-center mt-4 border-collapse">
          <thead className="text-lg">
            <tr>
              <th>#Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {rows.map(row => (
              <tr key={row.customer_id} className="odd:bg-white">
                <td>{row.customer_id}</td>
                <td>
                  {editingId === row.customer_id ? (
                    <input
                      name="customer_name"
                      value={editData.customer_name}
                      onChange={e => setEditData({ ...editData, customer_name: e.target.value })}
                    />
                  ) : (
                    row.customer_name
                  )}
                </td>
                <td>
                  {editingId === row.customer_id ? (
                    <input
                      name="customer_email"
                      value={editData.customer_email}
                      onChange={e => setEditData({ ...editData, customer_email: e.target.value })}
                    />
                  ) : (
                    row.customer_email
                  )}
                </td>
                <td className="flex justify-evenly">
                  {editingId === row.customer_id ? (
                    <button onClick={() => handleUpdate(row.customer_id)}>
                      <span className="material-symbols-outlined text-green-600">save</span>
                    </button>
                  ) : (
                    <button onClick={() => {
                      setEditingId(row.customer_id);
                      setEditData({ customer_name: row.customer_name, customer_email: row.customer_email });
                    }}>
                      <span className="material-symbols-outlined text-green-600">edit</span>
                    </button>
                  )}
                  <button onClick={() => handleDelete(row.customer_id)}>
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

export default Customers;
