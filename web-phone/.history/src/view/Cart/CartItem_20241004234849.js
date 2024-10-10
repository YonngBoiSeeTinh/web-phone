import React, { useState } from "react";
import './Cart.css';
import axios from 'axios';

const CartItem = ({ cart, handleSelectedCart,setTotalPrice }) => {
  const handleChange = (e) => {
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
  };

  const [amount, setAmount] = useState(cart.amount);
  const [price, setPrice] = useState(cart.price);
  useEffect(() => {
    setTotalPrice(price); // Cập nhật totalPrice mỗi khi price thay đổi
  }, [price, setTotalPrice]);
  const handleAddAmount = () => {
    const newAmount = amount + 1;
    const newPrice = cart.price * newAmount; 
    setAmount(newAmount);
    setPrice(newPrice);
   
    setTotalPrice(newPrice)
    //handleUpdateAmount(newAmount, newPrice);
  };

  const handleSubtractionAmount = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      const newPrice = cart.price * newAmount;
      setAmount(newAmount);
      setPrice(newPrice);
      setTotalPrice(newPrice)
      //handleUpdateAmount(newAmount, newPrice);
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
        <p className="item-price"> {price} đ</p> {/* Hiển thị giá mới từ state */}
      </div>
      <div className="quantity-control">
        <button onClick={handleSubtractionAmount}>-</button>
        <span>{amount}</span> {/* Hiển thị amount từ state */}
        <button onClick={handleAddAmount}>+</button>
      </div>
      <input type="checkbox" className="pickItem" onChange={handleChange} />
      <button className="deleteItem">Xóa</button>
    </div>
  );
};

export default CartItem;
