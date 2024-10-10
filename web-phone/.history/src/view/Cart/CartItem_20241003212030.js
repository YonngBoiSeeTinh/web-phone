import React, { useState } from "react";
import './Cart.css';



const CartItem = (cart) => {
  
  return (
     <div className="cart-item">
        <div className="item-image">
          <img src="https://cdn.viettelstore.vn/Images/Product/ProductImage/723473385.jpeg" alt="iPhone 14 Pro 256GB" />
        </div>
        <div className="item-details">
          <h3>iPhone 14 Pro 256GB</h3>
         
          <p>Màu: Tím</p>
          <p className="item-price"> 20.000.000 đ</p>
        </div>
       
          <div className="quantity-control">
            <button >-</button>
            <span>so luong</span>
            <button >+</button>
          </div>
         
      
      
            <input type="checkbox"  className="pickItem"/>      
      
      </div>
  );
};

export default CartItem;
