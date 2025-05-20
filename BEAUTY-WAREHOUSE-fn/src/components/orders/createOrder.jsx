import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Error from '../notification/error';
import Success from '../notification/success';
import { useNavigate } from 'react-router-dom';
//token
const token = localStorage.getItem('authorization')
const CreateOrder = () => {
      const navigate = useNavigate()
      const [customers, setCustomers] = useState([]);
      const [products, setProducts] = useState([]);
      const [data, setData] = useState({
            product_id: '',
            customer_id: '',
            amount: '' // Corrected spelling here
      });
      const [isError, setIsError] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);
      const [message, setMessage] = useState('');

      useEffect(() => {
            async function getData() {
                  try {
                        const { data: { rows: customerRows } } = await axios.get('http://localhost:3000/api/v1/customers', { headers: { 'authorization': token } });
                        setCustomers(customerRows);

                        const { data: { rows: productRows } } = await axios.get('http://localhost:3000/api/v1/products', { headers: { 'authorization': token } });
                        setProducts(productRows);
                  } catch (error) {
                        setIsError(true)
                        const { response: { data: { msg } } } = error;
                        setMessage(msg)
                  }
            }
            getData();
      }, []);

      const handleInputChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
                  const { data: { msg } } = await axios.post('http://localhost:3000/api/v1/orders', data, { headers: { 'authorization': token } });
                  setIsSuccess(true);
                  setMessage(msg);
                  setData({
                        product_id: '',
                        customer_id: '',
                        amount: '' // Corrected spelling here
                  });
                  navigate('/Dashboard')
            } catch (error) {
                  setIsError(true);
                  const { response: { data: { msg } } } = error;
                  setMessage(msg);
            }
      };

      return (
            <form onSubmit={handleSubmit} className="w-full border p-6 bg-white rounded-lg shadow-md mb-4">
                  {isError && <Error msg={message} />}
                  {isSuccess && <Success msg={message} />}
                  <h2 className="text-2xl font-semibold text-[#173b3f] mb-4">Create New Order</h2>

                  {/* Customer Dropdown */}
                  <div className="mb-4">
                        <label htmlFor="customer_id" className="block font-medium text-lg text-[black] mb-2">
                              Customer Name:
                        </label>
                        <select
                              id="customer_id"
                              name="customer_id"
                              value={data.customer_id}
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                        >
                              <option disabled value=''>Select customer</option>
                              {customers.map((customer) => {
                                    const { customer_id, first_name, last_name } = customer;
                                    return (
                                          <option key={customer_id} value={customer_id}>
                                                {`${first_name} ${last_name}`}
                                          </option>
                                    );
                              })}
                        </select>
                  </div>

                  {/* Product Dropdown */}
                  <div className="mb-4">
                        <label htmlFor="product_id" className="block font-medium text-lg text-[black] mb-2">
                              Product Name:
                        </label>
                        <select
                              id="product_id"
                              name="product_id"
                              value={data.product_id}
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                        >
                              <option disabled value=''>Select product</option>
                              {products.map((product) => {
                                    const { product_id, product_name } = product;
                                    return (
                                          <option key={product_id} value={product_id}>
                                                {product_name}
                                          </option>
                                    );
                              })}
                        </select>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-4">
                        <label htmlFor="amount" className="block font-medium text-lg text-[black] mb-2">
                              Amount (kg):
                        </label>
                        <input
                              type="number"
                              id="amount"
                              name="amount" // Corrected spelling here
                              value={data.amount} // Corrected spelling here
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter amount in kg"
                        />
                  </div>

                  {/* Submit Button */}
                  <button
                        type="submit"
                        className="mt-4 bg-[#173b3f] text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-[#145053] transition duration-200"
                  >
                        Submit
                  </button>
            </form>
      );
};

export default CreateOrder;