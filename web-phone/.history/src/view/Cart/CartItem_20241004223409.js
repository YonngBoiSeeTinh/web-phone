import React, { useState } from "react";
import './Cart.css';



const CartItem = (cart) => {
  
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
            <button >-</button>
            <span>{cart.amount}</span>
            <button >+</button>
          </div>
         
      
      
            <input type="checkbox"  className="pickItem"/>      
      
      </div>
  );
};

export default CartItem;
