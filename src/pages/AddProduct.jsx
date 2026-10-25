import React, { useState } from 'react';
import { addProduct } from '../services/productService';

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  }


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await addProduct({
        name: product.name,
        price: Number(product.price),
        stock: Number(product.stock)
      });

      console.log(response);

      setMessage(response);

      setProduct({
        name: "",
        price: "",
        stock: ""
      });

    }
    catch (error) {

      console.log(error);

      setMessage("Failed to add product");

    }
  }


  return (
    <div>

      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Product Name : </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Price : </label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Stock : </label>

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Add Product
        </button>

      </form>

      <h3>{message}</h3>

    </div>
  );
}

export default AddProduct;