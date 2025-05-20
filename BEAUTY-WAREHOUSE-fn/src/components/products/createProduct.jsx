import axios from 'axios';
import React, { useState } from 'react';
import Error from '../notification/error'
import Success from '../notification/success';
const token = localStorage.getItem('authorization')
const CreateProduct = () => {
      const [data, setData] = useState({
            product_name: '',
            product_quantity: '',
            unit_price: ''
      })
      const [isError, setIsError] = useState(false)
      const [isSuccess, setIsSuccess] = useState(false)
      const [message, setMessage] = useState('')
      const handleInputChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value })
      }
      const handleSubmit = async (e) => {

            e.preventDefault()
            try {

                  const { data: { msg } } = await axios.post('http://localhost:3000/api/v1/products', data, { headers: { 'authorization': token } })
                  setIsSuccess(true)
                  setMessage(msg)
            } catch (error) {
                  setIsError(true)
                  const { response: { data: { msg } } } = error;
                  setMessage(msg)
            }
      }
      return (
            <form className="w-full border p-6 bg-white rounded-lg shadow-md mb-4" onSubmit={handleSubmit}>
                  {isError && <Error msg={message} />}
                  {isSuccess && <Success msg={message}/>}
                  <h2 className="text-2xl font-semibold text-[#173b3f] mb-4">Create New Product</h2>

                  <div className="mb-4">
                        <label htmlFor="product_name" className="block font-medium text-lg text-black mb-2">
                              Product Name:
                        </label>
                        <input onChange={handleInputChange}
                              type="text"
                              id=" product_name "
                              name="product_name"
                              value={data.product_name}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter product name "
                        />
                  </div>

                  <div className="mb-4">
                        <label htmlFor="product_quantity" className="block font-medium text-lg text-black mb-2">
                              Product quantity in (kg):
                        </label>
                        <input onChange={handleInputChange}
                              type="number"
                              id="product_quantity"
                              name="product_quantity"
                              value={data.product_quantity}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter product quantity in kg"
                        />
                  </div>

                  <div className="mb-4">
                        <label htmlFor="unit_price" className="block font-medium text-lg text-black mb-2">
                              Unit price in (rwf.):
                        </label>
                        <input onChange={handleInputChange}
                              type="number"
                              id="unit_price"
                              name="unit_price"
                              value={data.unit_price}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter unit price in Rwf."
                        />
                  </div>

                  <button
                        type="submit"
                        className="mt-4 bg-[#173b3f] text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-[#145053] transition duration-200"
                  >
                        Submit
                  </button>
            </form>
      );
};

export default CreateProduct;
