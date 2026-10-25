import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/orderService';

function OrderHistory() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrdersHere();
  }, []);


  async function getAllOrdersHere() {

    try {

      const response = await getAllOrders();

      console.log(response);

      setOrders(response);

    }
    catch (error) {

      console.log(error);

    }
  }


  return (
    <div>

      <h2>All Orders</h2>

      {orders.length === 0 ? (

        <h3>No orders found</h3>

      ) : (

        <div>

          {orders.map((order) => (

            <div key={order.orderitems.id}>

              <h3>
                Order Id : {order.orderitems.id}
              </h3>

              <h3>
                User Email : {order.email}
              </h3>

              <h3>
                Product Id : {order.orderitems.productid}
              </h3>

              <h3>
                Product Name : {order.orderitems.productname}
              </h3>

              <h3>
                Price : {order.orderitems.price}
              </h3>

              <h3>
                Quantity : {order.orderitems.quantity}
              </h3>

              <h3>
                Subtotal :
                {order.orderitems.price * order.orderitems.quantity}
              </h3>

              <hr />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default OrderHistory;