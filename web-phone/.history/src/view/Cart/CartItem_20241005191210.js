import React, { useState } from "react";
import './Cart.css';
import axios from 'axios';

const CartItem = ({ cart, handleSelectedCart }) => {
  const [totalItemPrice, setTotalItemPrice] = useState(cart.totalPrice);
  const [amount, setAmount] = useState(cart.amount);
  const [isSelected, setIsSelected] = useState(cart.isSelected);

  const handleUpdateAmount = async (newAmount, newPrice) => {
    try {
      await axios.put(`http://localhost:3001/api/cart/update/${cart._id}`, {
        amount: Number(newAmount),
        totalPrice: Number(newPrice)
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?');
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:3001/api/cart/delete/${cart._id}`);
      window.location.reload(); // Tải lại trang sau khi xóa
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setIsSelected(isChecked);
    handleSelectedCart(cart, isChecked); // Gọi hàm cập nhật selectedCart từ Cart
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
        <p className="item-price">{totalItemPrice} đ</p>
      </div>
      <div className="quantity-control">
        <button onClick={handleSubtractionAmount}>-</button>
        <span>{amount}</span>
        <button onClick={handleAddAmount}>+</button>
      </div>
      <input
        type="checkbox"
        className="pickItem"
        onChange={handleChange}
        checked={isSelected}
      />
      <button className="deleteItem" onClick={handleDelete}>Xóa</button>
    </div>
  );
};

export default CartItem;
