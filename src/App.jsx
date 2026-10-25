import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { Routes,Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import MyOrders from './pages/MyOrders'
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct'
import OrderHistory from './pages/OrderHistory'

function App() {
  const [cart,setCart] = useState(()=>{
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(()=>{
    localStorage.setItem("cart" , JSON.stringify(cart));
  },[cart]);
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products cart={cart} setCart={setCart}/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/ordershistory' element={<OrderHistory/>}/>

      </Routes>
    </div>
  )
}

export default App
