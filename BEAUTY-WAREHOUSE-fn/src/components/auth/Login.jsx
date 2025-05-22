import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Error from '../notification/error'
import Success from '../notification/success'
const Login = () => {
      let navigate = useNavigate()
      const [data, setData] = useState({ user_name: "", password: "" })
      const [isError, setIsError] = useState(false)
      const [isSuccess, setIsSuccess] = useState(false)
      const [message, setMessage] = useState('')
      const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                  {/* Provided User with token */ }
                  const { data: { msg, token } } = await axios.post('/auth/login', data)
                  setMessage(msg)
                  setIsError(false)
                  setIsSuccess(true)
                  localStorage.setItem('authorization', `Bearer ${token}`)
                  setTimeout(() => {
                        navigate('/Dashboard')
                  }, 600)
            } catch (error) {
                  console.log(error);
                  
                  const { response: { data: { msg } } } = error
                  setMessage(msg)
                  setIsError(true)
                  setIsSuccess(false)
            }
      }

      const handleInputChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value })
      }

      return (
            <div className='flex items-center justify-center bg-[#f1f1f1] min-h-screen'>
                  <div className='p-5 bg-white shadow-lg border border-[#f0f3f5] rounded-sm'>
                        {isError && <Error msg={message} />}
                        {isSuccess && <Success msg={message} />}
                        <h4 className='text-3xl text-[#173b3f] my-6 font-bold'>Welcome to beauty warehouse, 👋🏿</h4>
                        <p>Please sign-in to your account</p>
                        <form className='flex flex-col text-lg' onSubmit={handleSubmit}>
                              <label htmlFor="user_name" className='my-2'> Username </label>
                              <input type="text" name="user_name" id="user_name" value={data.user_name}
                                    onChange={handleInputChange} className='p-2 border border-[#d8d6de] focus:outline-none focus:border focus:border-[#173b3f] focus:rounded-sm' />
                              <label htmlFor="password" className='my-2'>Password</label>
                              <input type="password" name="password" id="password" value={data.password}
                                    onChange={handleInputChange} className='p-2 border border-[#d8d6de] focus:outline-none focus:border focus:border-[#173b3f] focus:rounded-sm' />
                              <button type="submit" className='bg-[#173b3f] text-white p-2 my-2 rounded-xl hover:border border-amber-50'>Sign in</button>
                        </form>
                        <p>Don't have account <span><Link to='register' className='text-[#173b3f] hover:underline'>Register</Link></span>!</p>
                  </div>
            </div>
      )
}

export default Login