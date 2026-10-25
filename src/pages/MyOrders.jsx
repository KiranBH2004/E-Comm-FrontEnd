import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderService';

function MyOrders() {

  const [myorders, setMyorders] = useState([]);

  useEffect(() => {
    getMyOrdersHere();
  }, []);

  async function getMyOrdersHere() {
    try {
      const response = await getMyOrders();

      console.log(response);

      setMyorders(response);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>

      <h2>My Orders</h2>

      {myorders.map(order => {

        // Calculate total price of this order
        const totalOrderPrice = order.items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );

        return (

          <div key={order.orderid}>

            <h3>Order ID : {order.orderid}</h3>

            <h3>Status : {order.status}</h3>

            <h3>Email : {order.email}</h3>

            <h3>Total Order Price : ₹{totalOrderPrice}</h3>

            <h4>Items:</h4>

            {order.items.map(item => (

              <div key={item.id}>

                <p>Product ID : {item.productid}</p>

                <p>Product Name : {item.productname}</p>

                <p>Price : ₹{item.price}</p>

                <p>Quantity : {item.quantity}</p>

              </div>

            ))}

            <hr />

          </div>
        );
      })}

    </div>
  );
}

export default MyOrders;