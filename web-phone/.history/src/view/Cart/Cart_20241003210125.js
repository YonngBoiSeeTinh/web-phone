import React, { useState } from "react";
import './Cart.css';
import CartItem from "./CartItem";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Cart = () => {

  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/cart/get`);
      return res.data.data; // Đảm bảo đây là một mảng
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

  const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
  
  const listPro = query.data || []; 
  // Kiểm tra trạng thái của truy vấn
  if (query.isLoading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  if (query.isError) {
    return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
  }



  return (
    <div className="cart-container">
      <div className="cart-header">
        <a href="#" className="back-link">Về trang chủ </a>
        <a href="#" className="cart-link">Giỏ hàng của bạn</a>
      </div>
      {listPro.map((cart, index) =>{
         <CartItem  cart = {cart} key = {index}></CartItem>

      })}
    
      <div className="cart-summary">
        <p>Tạm tính (1 sản phẩm):</p>
        <p>đ</p>
      </div>

      <form className="cart-form">
        <div className="customer-info">
          <input type="text" placeholder="Họ và Tên" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="text" placeholder="Số nhà, tên đường" />
        </div>

        <div className="delivery-method">
          <h4>Chọn hình thức nhận hàng</h4>
          <label>
            <input type="radio" name="delivery" value="Giao tận nơi" defaultChecked /> Giao tận nơi
          </label>
          <label>
            <input type="radio" name="delivery" value="Nhận tại cửa hàng" /> Nhận tại cửa hàng
          </label>
        </div>
        <div className="total-section">
          <div className="total-price">
            <p>Tổng tiền:</p>
            <p>đ</p>
          </div>
        </div>

        <div className="cart-agreement">
          <label>
            <input type="checkbox" /> Tôi đồng ý với <a href="#">Chính sách xử lý dữ liệu cá nhân</a> của TopZone
          </label>
        </div>

        <button className="submit-button">Đặt hàng</button>
      </form>
    </div>
  );
};

export default Cart;
