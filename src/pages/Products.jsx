import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

function Products({ cart, setCart }) {

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const response = await getProducts();
      console.log(response);
      setProducts(response);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  function addToCart(product) {

    const quantity = quantities[product.pid];

    if (!quantity || quantity <= 0) {
      return;
    }

    const cartItem = {
      productId: product.pid,
      productName: product.name,
      productPrice: product.price,
      productStock: product.stock,
      quantity: quantity
    };
    console.log(cartItem)
    const existingItem = cart.find(
      item => item.productId === product.pid
    );

    if (existingItem) {

      if (existingItem.quantity + quantity > product.stock) {
        return;
      }

      const updatedCart = cart.map(item => {

        if (item.productId === product.pid) {
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }

        return item;
      });

      setCart(updatedCart);
    }
    else {
      setCart([...cart, cartItem]);
    }
  }

  return (
    <div>

      Products

      {products.map((product) => (

        <div key={product.pid}>

          <h3>Product name : {product.name}</h3>

          <h3>Product Price : {product.price}</h3>

          <h3>Stock : {product.stock}</h3>

          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantities[product.pid] || ""}
            placeholder="qty"
            onChange={(e) => {
              setQuantities({
                ...quantities,
                [product.pid]: Number(e.target.value)
              });
            }}
          />

          <button onClick={() => addToCart(product)}>
            Add To Cart
          </button>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default Products;