import React, { useState } from "react";
import './Cart.css';



const CartItem = (cart) => {
  
  return (
     <div className="cart-item">
        <div className="item-image">
          <img src="iphone-image-url" alt="iPhone 14 Pro 256GB" />
        </div>
        <div className="item-details">
          <h3>iPhone 14 Pro 256GB</h3>
          <p>3 Khuyến mãi</p>
          <p>Màu: Tím</p>
        </div>
        <div className="item-price">
          <p>đ</p>
          <p><del>29.490.000đ</del></p>
          <div className="quantity-control">
            <button >-</button>
            <span>so luong</span>
            <button >+</button>
          </div>
        </div>
      </div>
  );
};

export default CartItem;
