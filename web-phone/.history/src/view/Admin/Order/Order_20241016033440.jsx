import React from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const Order = () => {
  
  // const location = useLocation();
  // const { listOrder } = location.state || {};
  // let listNonAccept = listOrder.filter((item)=>!item.accept)
  // console.log('listNonAccept',listNonAccept);
  // const handleClickAccept = (orderId, currentAccept) => {
  //   handleAcceptOrder(orderId, currentAccept);
  // };

  // const handleAcceptOrder = async (orderId, currentAccept) => {
   
  //   try {
  //     console.log('orderId', orderId);
  //     const res = await axios.put(`http://localhost:3001/api/order/update/${orderId}`, {
  //       accept: !currentAccept // đảo ngược trạng thái hiện tại
  //     });
  //     alert("Xác nhận đơn hàng thành công");
    
  //     return res.data.data;
  //   } catch (error) {
  //     console.error('Error updating order:', error);
  //     throw error;
  //   }

  // };


    return (
    <div className="admin_order-item">
       
      <div className="order">
        <div className="order_title order_item">
              <div className="num">1</div>
              <img className="avatar"></img>
              <div className="name">
              <img/> Lam tung
              </div>
              <div className="addres">5a Tống Văn Hên Tân Bình HCM</div>  
              <div className="date">15/10/2004</div>
              <div className="status nonaccept ">Chưa duyệt</div>
              <div className="action">
                <button className="accept-btn">Duyệt</button>
                <button className="delete-btn">Hủy</button>
              </div>
              
          </div> 
          <div className="order_detail" >
              <img/> 
              <div>
                <div style={{display:"flex"}}>
                  <div className="proName">Tên sản phẩm</div>
                  <div className="proAmount">Số lượng: </div>
                  <div className="proPrice">Tổng tiền: </div>
                </div>
                <div style={{display:"flex"}} >
                  <div className="proName">Iphone 15 pro max</div>
                  <div className="proAmount">1 </div>
                  <div className="proPrice">25000000 vnđ </div>
              </div>
              </div>             
          </div>
      </div>
        
       </div> 
     );
}

export default Order;
