import React, { useState, useEffect } from 'react';
import CreateCustomer from './createCustomer';
import axios from 'axios';

const token = localStorage.getItem('authorization')

const Customers = () => {
  const [rows, setRows] = useState([]);
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  useEffect(() => {
    async function getCustomers() {
      try {
        const { data: { rows } } = await axios.get('http://localhost:3000/api/v1/customers', { headers: { 'authorization': token } });
        setRows(rows);

      } catch (error) {
        if (error) throw error
      }
    }
    getCustomers();
  }, []);

  return (
    <div>
      <header className='flex flex-row justify-between'>
        <h1 className='text-2xl font-semibold mb-2'>Registered Customers:</h1>
        <form action="" className='flex flex-row justify-start'>
          <input type='search' placeholder='search customer ...' className='p-1' />
          <button type="submit"></button>
        </form>
      </header>
      <hr />

      <section className='flex flex-col mt-6'>
        {/* New Customer */}
        <button
          type="button"
          onClick={() => setIsNewCustomer(true)}
          className='text-left text-lg flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2 w-1/5 cursor-pointer hover:bg-[#143337]'
        >
          Add Customer
        </button>
        {isNewCustomer && <CreateCustomer />}
        {/* Render Table */}
        <table className='w-full border-collapse text-center'>
          <thead className='text-lg'>
            <tr>
              <th>#Customer ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location</th>
              <th>Telephone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-lg'>
            {rows.map((row, index) => (
              <tr key={index} className='odd:bg-white'>
                <td>{row.customer_id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.location}</td>
                <td>{row.telephone}</td>
                <td className='flex justify-evenly'>
                  <button type='submit' className='cursor-pointer'>
                    <span className="material-symbols-outlined text-green-600">edit</span>
                  </button>
                  <button type='submit' className='cursor-pointer'>
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