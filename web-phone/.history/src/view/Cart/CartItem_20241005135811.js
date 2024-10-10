import React, { useState, useEffect } from "react";
import './Cart.css';
import axios from 'axios';

const CartItem = ({ cart, handleSelectedCart, selectedCart, setSelectedCart, totalPrice, setTotalPrice }) => {
  const [totalItemPrice, setTotalItemPrice] = useState(cart.totalPrice);
  const [amount, setAmount] = useState(cart.amount);

  const handleUpdateAmount = async (newAmount, newPrice) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/cart/update/${cart._id}`, {
        amount: Number(newAmount),
        totalPrice: Number(newPrice)
      });
      console.log(res.data);

      // Cập nhật selectedCart nếu sản phẩm đã được chọn
      if (selectedCart.some(item => item._id === cart._id)) {
        setSelectedCart(prevSelected => 
          prevSelected.map(item =>
            item._id === cart._id ? { ...item, amount: newAmount, totalPrice: newPrice } : item
          )
        );
      }

    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    handleSelectedCart(cart, e.target.checked);
  };

  const handleAddAmount = () => {
    const newAmount = amount + 1;
    const newPrice = cart.price * newAmount;

    setTotalItemPrice(newPrice);
    setAmount(newAmount);
    handleUpdateAmount(newAmount, newPrice);
  };

  const handleSubtractionAmount = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      const newPrice = cart.price * newAmount;

      setTotalItemPrice(newPrice);
      setAmount(newAmount);
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
        <p className="item-price"> {totalItemPrice} đ</p>
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
