import React, { useState, useEffect } from "react";
import './Cart.css';
import CartItem from "./CartItem";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from "../Loading/Loading";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [selectedCart, setSelectedCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = user.id;
    const userName = user.name;
    const address = user.address;
 
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/cart/getByUserId/${userId}`);
      return res.data.data;  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const query = useQuery({ queryKey: ['products'],
                           queryFn: fetchApi,
                           refetchOnWindowFocus: true,  // Tự động refetch khi focus lại cửa sổ
                           refetchOnMount: true,        // Refetch khi component mount (lần đầu truy cập)
                           });
  const listCart = query.data || []; 

  const handleSelectedCart = (cartItem, isChecked) => {
    if (isChecked) {    
      setSelectedCart((prevSelected) => [...prevSelected, cartItem]);
    } else {    
      setSelectedCart((prevSelected) =>
        prevSelected.filter((item) => item._id !== cartItem._id)  
      );    
    }
  };

  useEffect(() => {
    const calculateTotalPrice = (cart) => {
      const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice(selectedCart);
  }, [selectedCart]);
    
  // Cập nhật giá trị `listCart` khi số lượng sản phẩm thay đổi trong CartItem
    const updateCartList = (updatedCart) => {
      query.refetch(); // Cập nhật lại dữ liệu giỏ hàng nếu cần thiết
    };

    const handleOrder = async () => {
      if (selectedCart.length === 0) {
        alert('Vui lòng chọn sản phẩm để đặt hàng');
        return;
      }
    
      // Tạo một mảng các sản phẩm đặt hàng với các trường cần thiết
      const orderProducts = selectedCart.map(item => ({
        name: item.name,          // Tên sản phẩm
        image: item.image,        // Hình ảnh sản phẩm
        price: item.price,        // Giá sản phẩm
        totalPrice: item.totalPrice, // Tổng giá sản phẩm
        amount: item.amount,      // Số lượng sản phẩm
        userId,                   // ID người dùng
        userName,                 // Tên người dùng
        address,                  // Địa chỉ
        color: item.color,        // Màu sắc
        isPaid: false,            // Mặc định là chưa thanh toán
        accept: false             // Mặc định là chưa chấp nhận
      }));
    
      console.log('Dữ liệu đơn hàng:', orderProducts); // Log dữ liệu đơn hàng
    
      try {
        const response = await axios.post('http://localhost:3001/api/order/create', {
          orderProducts  // Gửi mảng sản phẩm đặt hàng
        });
    
        if (response.data.status === 'OK') {
          alert('Đơn hàng đã được đặt thành công!');
          console.log(response.data);
          // Thực hiện hành động khác nếu cần, như reset giỏ hàng
        } else {
          alert('Đặt hàng thất bại!');
        }
      } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        alert('Có lỗi xảy ra khi đặt hàng!');
      }
    };
    
    

  // Kiểm tra trạng thái của truy vấn
  if (query.isLoading) {
    return <Loading />;
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
      {listCart.map((cart, index) => (
        <CartItem  cart={cart}
        key={index}
        handleSelectedCart={handleSelectedCart}
        selectedCart={selectedCart}
        setSelectedCart={setSelectedCart}
        updateCartList={updateCartList}/>
      ))}
  
      <div className="cart-summary">
        <p>Tạm tính ({selectedCart.length} sản phẩm):</p>
        <p>{totalPrice}đ</p>
      </div>

      <div className="cart-form">
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
            <p>{totalPrice}đ</p>
          </div>
        </div>

        <div className="cart-agreement">
          <label>
            <input type="checkbox" /> Tôi đồng ý với <a href="#">Chính sách xử lý dữ liệu cá nhân</a> của TopZone
          </label>
        </div>

        <button className="order-button" onClick={handleOrder}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default Cart;
