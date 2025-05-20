import React from 'react'

const Report = () => {
  return (
    <div>
      <header className='flex flex-row justify-between'>
        <h1 className='text-2xl font-semibold mb-2'>Inventory movements report:</h1>
        <search>
          <form action="" className='flex flex-row justify-start'>
            <input type='search' placeholder='search order ...' className='p-1' />
            <button type="submit"></button>
          </form>
        </search>
      </header>
      <hr />
      <section className='flex flex-col mt-6'>
        <table className='w-full border-collapse text-center'>
          <thead className='text-lg'>
            <tr>
            <th>#Order no.</th>
            <th>Customer name</th>
            <th>Products</th>
            <th>Order date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>Florien</td>
              <td>Shoes</td>
              <td>2025-05-03</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Report