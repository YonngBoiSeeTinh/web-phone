import React, { useState } from "react";
import './Cart.css';
import CartItem from "./CartItem";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 27490000;

  const handleQuantityChange = (delta) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + delta));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <a href="#" className="back-link">Về trang chủ TopZone</a>
        <a href="#" className="cart-link">Giỏ hàng của bạn</a>
      </div>

     <CartItem handleQuantityChange ={handleQuantityChange}></CartItem>

      <div className="cart-summary">
        <p>Tạm tính (1 sản phẩm):</p>
        <p>{(price * quantity).toLocaleString()}đ</p>
      </div>

      <form className="cart-form">
        <div className="customer-info">
          <label>
            <input type="radio" name="gender" value="Anh" /> Anh
          </label>
          <label>
            <input type="radio" name="gender" value="Chị" /> Chị
          </label>
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

        <div className="additional-options">
          <label>
            <input type="checkbox" /> Gọi người khác nhận hàng
          </label>
          <label>
            <input type="checkbox" /> Chuyển danh bạ, dữ liệu qua máy mới
          </label>
          <label>
            <input type="checkbox" /> Xuất hóa đơn công ty
          </label>
        </div>

        <div className="total-section">
          <div className="coupon">
            <button>Sử dụng mã giảm giá</button>
          </div>
          <div className="total-price">
            <p>Tổng tiền:</p>
            <p>{(price * quantity).toLocaleString()}đ</p>
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
