import React, { useState } from 'react';
import axios from 'axios';
const token = localStorage.getItem('authorization')
import Success from '../notification/success';
import Error from '../notification/error';
const CreateCustomer = () => {
      const [data, setData] = useState({
            first_name: '',
            last_name: '',
            location: '',
            telephone: ''
      });
      const [isError, setIsError] = useState(false)
            const [isSuccess, setIsSuccess] = useState(false)
            const [message, setMessage] = useState('')

      const handleInputChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const {data:{msg}} = await axios.post('http://localhost:3000/api/v1/customers', data, { headers: { 'authorization': token } });
                  // Reset form after successful submission
                  setIsSuccess(true)
                  setMessage(msg)

                  setData({
                        first_name: '',
                        last_name: '',
                        location: '',
                        telephone: ''
                  });


            } catch (error) {
                  setIsError(true)
                  const { response: { data: { msg } } } = error;
                  setMessage(msg)
            }
      };

      return (
            <form onSubmit={handleSubmit} className="w-full border p-6 bg-white rounded-lg shadow-md mb-4">
                  {isError && <Error msg={message} />}
                  {isSuccess && <Success msg={message} />}
                  <h2 className="text-2xl font-semibold text-[#173b3f] mb-4">Create New Customer</h2>

                  {/* First Name Input */}
                  <div className="mb-4">
                        <label htmlFor="first_name" className="block font-medium text-lg text-[black] mb-2">
                              First Name:
                        </label>
                        <input
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={data.first_name}
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter first name"
                        />
                  </div>

                  {/* Last Name Input */}
                  <div className="mb-4">
                        <label htmlFor="last_name" className="block font-medium text-lg text-[black] mb-2">
                              Last Name:
                        </label>
                        <input
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={data.last_name}
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter last name"
                        />
                  </div>

                  {/* Location Input */}
                  <div className="mb-4">
                        <label htmlFor="location" className="block font-medium text-lg text-[black] mb-2">
                              Location:
                        </label>
                        <input
                              type="text"
                              id="location"
                              name="location"
                              value={data.location}
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter location"
                        />
                  </div>

                  {/* Telephone Input */}
                  <div className="mb-4">
                        <label htmlFor="telephone" className="block font-medium text-lg text-[black] mb-2">
                              Telephone:
                        </label>
                        <input
                              type="text"
                              id="telephone"
                              name="telephone"
                              value={data.telephone}
                              onChange={handleInputChange}
                              className="w-full border border-[#f0f3f5] rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#173b3f] bg-[#f7f9fa]"
                              placeholder="Enter telephone number"
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

export default CreateCustomer;