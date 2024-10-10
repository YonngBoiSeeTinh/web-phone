import React, { useState } from "react";
import './Cart.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const CartItem = ({cart,handleSelectedCart,setTotalPrice }) => {
  const handleChange = (e) => {
    // Kiểm tra nếu checkbox được chọn hoặc bỏ chọn
    handleSelectedCart(cart, e.target.checked);
  };
  const handleUpdateAmount = async (newAmount, newPrice) => {
    try {
        const res = await axios.put(`http://localhost:3001/api/cart/update/${cart.id}`, {
            amount: newAmount,
            price: newPrice
        });
        return res.data.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
}

const [amount, setAmount] = useState(cart.amount);
const [price, setPrice] = useState(cart.price);

const handleAddAmount = () => {
    const newAmount = amount + 1;
    const newPrice = cart.price * newAmount;  // Tính giá mới dựa trên amount mới
    setAmount(newAmount);
    setPrice(newPrice);
    handleUpdateAmount(newAmount, newPrice);  // Gọi hàm cập nhật với giá trị mới
}

const handleSubtractionAmount = () => {
    if (amount > 1) {  // Đảm bảo số lượng không âm
        const newAmount = amount - 1;
        const newPrice = cart.price * newAmount;
        setAmount(newAmount);
        setPrice(newPrice);
        handleUpdateAmount(newAmount, newPrice);
    }
}
  return (
     <div className="cart-item">
        <div className="item-image">
          <img src={cart.image} alt="iPhone 14 Pro 256GB" />
        </div>
        <div className="item-details">
          <h3>{cart.name}</h3>
          <p>Màu: {cart.color}</p>
          <p className="item-price"> {cart.price} đ</p>
        </div>
       
          <div className="quantity-control">
            <button onClick={handleSubtractionAmount}>-</button>
            <span>{amount}</span>
            <button onClick={handleAddAmount}>+</button>
          </div>  
            <input type="checkbox"  className="pickItem" onChange={handleChange}/>     
            <button className="deleteItem">Xóa</button> 
      
      </div>
  );
};

export default CartItem;
