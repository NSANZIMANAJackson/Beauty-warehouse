import React, { useState, useEffect } from 'react';
import CreateOrder from './createOrder';
import Success from '../notification/success';
import Error from '../notification/error';
import axios from 'axios';
const token = localStorage.getItem('authorization')
import { useNavigate } from 'react-router-dom';
const Orders = () => {
  const navigate = useNavigate()
  const [rows, setRows] = useState([]);
  const [isNewOrder, setIsNewOrder] = useState(false);
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')
  async function getOrders() {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/orders', { headers: { 'authorization': token } });
      setRows(data);
    } catch (error) {
      console.log(error)
      const { response: { data: { msg } } } = error
      setMessage(msg)
      setIsError(true)
      setIsSuccess(false)
    }
  }
  useEffect(() => {
    getOrders();
  }, []);

  async function handleDelete(id) {
    try {

      const { data } = await axios.delete(`http://localhost:3000/api/v1/orders/${id}`, { headers: { 'authorization': token } })
      setMessage(data)
      setIsError(false)
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/Dashboard')
      }, 600)

    } catch (error) {
      console.log("error occured");

      console.log(error);
    }
  }

  return (
    <div>
      <header className='flex flex-row justify-between'>
        <h1 className='text-2xl font-semibold mb-2'>Orders made by customers:</h1>
        <form action="" className='flex flex-row justify-start'>
          <input type='search' placeholder='search order ...' className='p-1' />
          <button type="submit"></button>
        </form>
      </header>
      <hr />
      {isError && <Error msg={message} />}
      {isSuccess && <Success msg={message} />}
      <section className='flex flex-col mt-6'>
        {/* New Order */}
        <button
          type="button"
          onClick={() => setIsNewOrder(true)}
          className='text-left text-lg flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2 w-1/5 cursor-pointer hover:bg-[#143337]'
        >
          Create New Order
        </button>
        {isNewOrder && <CreateOrder />}
        {/* Render Table */}
        <table className='w-full border-collapse text-center'>
          <thead className='text-lg'>
            <tr>
              <th>#Order ID</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-lg'>
            {rows.map((row, index) => (
              <tr key={index} className='odd:bg-white'>
                <td>{row.order_id}</td>
                <td>{row.first_name} {row.last_name}</td>
                <td>{row.product_name}</td>
                <td>{row.order_date}</td>
                <td className='flex justify-evenly'>
                  <button type='submit' className='cursor-pointer'>
                    <span className="material-symbols-outlined text-green-600">edit</span>
                  </button>
                  <button type='submit' className='cursor-pointer' onClick={() => handleDelete(row.order_id)}>
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
