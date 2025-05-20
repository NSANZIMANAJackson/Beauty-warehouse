import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate()
  const navItemClasses = ({ isActive }) =>
    isActive
      ? 'flex items-center border-l-10 border-[#f0f3f5] bg-[#173b3f] text-white rounded-md px-4 py-3 mb-2'
      : 'flex items-center  rounded-md px-4 py-3 mb-2 hover:bg-[#f0f3f5]';

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('authorization')
    setTimeout(() => {
      navigate('/')
    }, 500)
  }
  return (
    <div className="flex   ">
      <aside className="w-1/4 min-h-screen flex flex-col items-start p-6 justify-between bg-white">
        <h3 className="text-3xl font-bold mb-6 text-[#173b3f]">
          🤓 Beauty Warehouse .
        </h3>

        <nav className="text-lg font-medium w-9/12 flex-grow mt-32">
          <ul className="flex flex-col">
            <li>
              <NavLink to="customers" className={navItemClasses}>
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink to="orders" className={navItemClasses}>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="products" className={navItemClasses}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="report" className={navItemClasses}>
                Inventory Report
              </NavLink>
            </li>
          </ul>
        </nav>

        <button type='button' className="cursor-pointer rounded-md py-3 text-lg text-[#eb2929] bg-[#ff9595] font-medium w-9/12 hover:bg-[#b82828]" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className='w-full p-10 bg-[#f7f9fa]'>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
