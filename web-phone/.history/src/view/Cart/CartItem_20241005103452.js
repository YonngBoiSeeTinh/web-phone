import React, { useState, useEffect } from "react";
import './Cart.css';
import axios from 'axios';

const CartItem = ({ cart, handleSelectedCart }) => {
  const[isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    handleSelectedCart(cart, e.target.checked);
    setIsChecked(e.target.checked)
  };

  const handleUpdateAmount = async (newAmount, newPrice) => {
    try {
      await axios.put(`http://localhost:3001/api/cart/update/${cart.id}`, {
        amount: Number(newAmount),
        price: Number(newPrice)
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const [amount, setAmount] = useState(cart.amount);
  const [price, setPrice] = useState(cart.price);

  const handleAddAmount = () => {
    const newAmount = amount + 1;
    const newPrice = cart.price * newAmount;
    setAmount(newAmount);
    setPrice(newPrice);
   
    
    handleUpdateAmount(newAmount, newPrice);
  };

  const handleSubtractionAmount = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      const newPrice = cart.price * newAmount;
      setAmount(newAmount);
      setPrice(newPrice);
    
      handleUpdateAmount(newAmount, newPrice);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={cart.image} alt={cart.name} />
      </div>
      <div className="item-details">
        <h3>{cart.name}</h3>
        <p>Màu: {cart.color}</p>
        <p className="item-price"> {price} đ</p>
      </div>
      <div className="quantity-control">
        <button onClick={handleSubtractionAmount}>-</button>
        <span>{amount}</span>
        <button onClick={handleAddAmount}>+</button>
      </div>
      <input type="checkbox" className="pickItem" onChange={handleChange} />
      <button className="deleteItem">Xóa</button>
    </div>
  );
};

export default CartItem;
