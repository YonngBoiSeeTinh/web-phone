import React,{useEffect,useState} from 'react';
import TopNavigation from './view/Nav/TopNav';
import { useLocation } from 'react-router-dom';
import Home from './view/Home/Home';
import Header from './view/Header/Header';
import Footer from './view/Footer/Footer';
import TakeCare from './view/Care/TakeCare';
import ProductDetail from './view/Product/ProductDetail';
import ComProduct from './view/Company/ComProduct';
import Cart from './view/Cart/Cart';
import UserPage from './view/User/UserPage';
import axios from 'axios'; // Import axios để gọi API
import AdminLayout from './view/Admin/AdminLayout';
import AdminDasboard from './view/Admin/Dashboard/AdminDasboard';
import AdminProduct from './view/Admin/Product/ProductsPage';
import './style.css';
import {  Routes, Route } from 'react-router-dom';
import AddProduct from './view/Admin/Product/AddProduct';
import UpdateProduct from './view/Admin/Product/UpdateProduct';
import { jwtDecode } from 'jwt-decode';

import { isJsonString } from './Service/ultils';
import { axiosJWT, GetDetailUser } from './Service/UserService';
import { refresh_token } from './Service/UserService';


import { useDispatch } from 'react-redux';
import { updateUser } from './Redux/sliders/userSlide';


function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [isSignIn, setIsSignIn] = useState(false);

      useEffect(()=>{ 
       
          const {storageData, decode} =  handleDecode();       
            if(decode?.id){
                try {
                     handelGetDetailUser(decode.id, storageData);

                } catch (error) {
                    console.error('Lỗi khi tải chi tiết người dùng:', error);
                }
            }
      
      },[])
    
      const handleDecode =()=>{
        let storageData =  localStorage.getItem('accessToken');
        let decode = {}
        if(storageData && isJsonString(storageData)){
          
            storageData = JSON.parse(storageData)
            decode = jwtDecode(storageData)
            return {decode, storageData}
        }
      }
      axiosJWT.interceptors.response.use(function (config) {
        const {storageData, decode} =  handleDecode();
        const currentDate = new Date();
        if(decode?.exp < currentDate.getTime()/1000) { //mls
          
          const data =  refresh_token();
          config.headers['token'] = `Bearer ${data?.access_token}`
          console.log('het han accesstoken:',data.access_token);
        }
        return config;
      }, function (error) {
       
        return Promise.reject(error);
      });
    
      const dispatch = useDispatch();
      const handelGetDetailUser = async (id, token) =>{
          const res = await GetDetailUser(id, token)
          dispatch(updateUser({ ...res?.data, access_token: token })); 
         
    
      }
  return (
    <div className="App">
      {!isAdminPage && <Header isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>} {/* Hiển thị Header nếu không phải trang admin */}
      {!isAdminPage && <TopNavigation />} {/* Hiển thị TopNavigation nếu không phải trang admin */}
    
     
        <Routes>
         
          <Route path='/' element={<Home />} />
          <Route path='/takecare' element={<TakeCare />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:name' element={<ProductDetail />} />
          <Route path='/company/:companyName' element={<ComProduct />} />
          <Route path='/userPage' element={<UserPage setIsSignIn={setIsSignIn} />} />
          <Route path='/admin/' element={<AdminLayout />}>
              <Route index element={<AdminDasboard />} /> 
              <Route path='dashboard' element={<AdminDasboard />} /> 
              <Route path='products' element={<AdminProduct />} /> 
              <Route path='orders' element={<AdminProduct />} /> 
              <Route path='customers' element={<AdminProduct />} /> 
              <Route path='addProduct' element={<AddProduct />} />  
              <Route path='updateProduct/:name' element={<UpdateProduct />} />        
          </Route>
        </Routes>
     
      {!isAdminPage && <Footer />}
     
    </div>
  );
}

export default App;
