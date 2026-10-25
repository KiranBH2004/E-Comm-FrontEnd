import React from 'react';
import { createOrder } from '../services/orderService';
import { waitForPayment , verifyPayment } from '../services/paymentService';

function Cart({ cart, setCart }) {

    const total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)


  function increaseQuantity(productId) {

    const updatedCart = cart.map(item => {

      if (item.productId === productId) {

        if (item.quantity >= item.productStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1
        };
      }

      return item
    })

    setCart(updatedCart)
  }


  function decreaseQuantity(productId) {

    const updatedCart = cart.map(item => {

      if (item.productId === productId) {

        if (item.quantity <= 1) {
          return item
        }

        return {
          ...item,
          quantity: item.quantity - 1
        }
      }

      return item
    })

    setCart(updatedCart)
  }

  function removeFromCart(productId) {
    const updatedCart = cart.filter(
      item => item.productId !== productId
    );

    setCart(updatedCart);
  }

  function calculateTotal() {
    return cart.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  }

  async function placeOrder(){
    const orderRequest = {items : cart.map(item=>{
      return {productId : item.productId , quantity : item.quantity};
    })};
    try{
      const response = await createOrder(orderRequest);
      console.log(response)
      const orderId = response.data.orderid;
      console.log("Created Order ID : " ,orderId);

      const payment = await waitForPayment(orderId);
      console.log(payment);

      const options = {
        key : "rzp_test_TaPtxw7aaFxYno",
        amount : payment.amount * 100,
        currency : "INR",
        name : "My-E-Com-App",
        description : "OrderPayment",
        order_id : payment.razorpayOrderId,

        
handler: async function (razorpayResponse) {
  console.log("Razorpay Response:", razorpayResponse);

  try {
    const verificationResponse = await verifyPayment({
      orderId: orderId,
      razorpayPaymentId: razorpayResponse.razorpay_payment_id,
      razorpayOrderId: razorpayResponse.razorpay_order_id,
      razorpaySignature: razorpayResponse.razorpay_signature
    });

    console.log(
      "Payment Verification Response:",
      verificationResponse
    );

    setCart([]);

    alert(
      "Payment successful! Your order has been placed successfully."
    );

  } catch (error) {
    console.error(
      "Payment verification failed:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Payment verification failed. Please contact support before retrying."
    );
  }
},


      theme: {
        color: "#3399cc"
      }
    }

    const razorpay = new window.Razorpay(options)

    razorpay.open()

  } catch (error) {

    console.log(error)

  }
}

   return (
    <div>

      <h2>My Cart</h2>

      {cart.length === 0 ? (

        <h3>Your cart is empty</h3>

      ) : (

        <div>

          {cart.map((item) => (

            <div key={item.productId}>

              <h3>
                Product Name : {item.productName}
              </h3>

              <h3>
                Price : {item.productPrice}
              </h3>


              <div>

                <button
                  onClick={() =>
                    decreaseQuantity(item.productId)
                  }
                >
                  -
                </button>

                <span style={{ margin: '0 15px' }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.productId)
                  }
                >
                  +
                </button>

              </div>


              <h3>
                Subtotal : {item.productPrice * item.quantity}
              </h3>


              <button
                onClick={() =>
                  removeFromCart(item.productId)
                }
              >
                Remove
              </button>

              <hr />

            </div>

          ))}


          <h2>
            Total : {calculateTotal()}
          </h2>
          
          {cart.length > 0 && (
            <button onClick={placeOrder}>Place Order</button>
          )}

        </div>

      )}

    </div>
  );
}

export default Cart;