import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Report from './components/Report'
import Products from './components/products/Products'
import Order from './components/orders/Order'
import EditOrder from './components/orders/editOrder'
import ProtectedRoute from './components/auth/protectedRoute'
import Customer from './components/customers/Customers'
const App = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path='' element={<Login />} />
                        <Route path='register' element={<Signup />} />
                        <Route
                              path='dashboard'
                              element={
                                    <ProtectedRoute>
                                          <Dashboard />
                                    </ProtectedRoute>
                              }
                        >
                              <Route index element={<Order />} />
                              <Route path='orders' element={<Order />} />
                              <Route path='customers' element={<Customer />} />
                              <Route path='orders/:orderId' element={<EditOrder />} />
                              <Route path='products' element={<Products />} />
                              <Route path='products/:productId' element={<Report />} />
                              <Route path='report' element={<Report />} />
                        </Route>
                  </Routes>
            </BrowserRouter>
      )
}

export default App