import React, { useState, useEffect } from 'react'
import CreateProduct from './createProduct'
import axios from 'axios'
const token = localStorage.getItem('authorization')
const Products = () => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    async function getProducts() {
      try {
        const { data: { rows } } = await axios.get('http://localhost:3000/api/v1/products', { headers: { 'authorization': token } })
        setRows(rows)
      } catch (error) {
        if(error) throw error
      }
    }
    getProducts()
  }, [])
  const [isNewProduct, setisNewProduct] = useState(false)
  return (
    <div>
      <header className='flex flex-row justify-between'>
        <h1 className='text-2xl font-semibold mb-2'>Available products:</h1>
        <form action="" className='flex flex-row justify-start'>
          <input type='search' placeholder='search order ...' className='p-1' />
          <button type="submit"></button>
        </form>
      </header>
      <hr />

      <section className='flex flex-col mt-6'>
        {/* New order */}
        <button type="button" onClick={() => setisNewProduct(true)} className='text-left text-lg flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2 w-1/5 cursor-pointer hover:bg-[#143337]'>Add product</button>
        {isNewProduct && <CreateProduct />}
        {/* render table */}
        <table className='w-full border-collapse text-center'>
          <thead className='text-lg'>
            <tr>
              <th>#Product no.</th>
              <th>Product name</th>
              <th>Products quantity</th>
              <th>Unit price</th>
              <th>Total price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-lg'>
            {/* <tr> */}
              {rows.map((row,index) => {
                return (<tr key={index} className='odd:bg-white'>
                  <td>{row.product_id}</td>
                  <td>{row.product_name}</td>
                  <td>{row.product_quantity}</td>
                  <td>{row.unit_price}</td>
                  <td>{row.total_price}</td>
                  <td className='flex justify-evenly'>
                    <button type='submit' className='cursor-pointer'>
                      <span class="material-symbols-outlined text-green-600">
                        edit
                      </span>
                    </button>
                    <button type='submit' className='cursor-pointer'>
                      <span class="material-symbols-outlined text-red-600">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>)
              })}
              {/* 
            </tr> */}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Products