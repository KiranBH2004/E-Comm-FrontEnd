import React from 'react'
import { Link, useLocation } from 'react-router'

function NavBar() {

    const location = useLocation();
    if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register"){
        return null;
    }

    const role = localStorage.getItem("role");

  return (
    <nav>
        <Link to="/home">Home</Link>{"  "}        
        <Link to="/products">Products</Link>
        
        {role === "USER" && (
          <>
          <Link to="/myorders">My Orders</Link>
          <Link to="/cart">Cart</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
          <Link to="/addproduct">Add Product</Link>
          <Link to="/ordershistory">Orders History</Link>
          </>
        )}
    </nav>
  )
}

export default NavBar
