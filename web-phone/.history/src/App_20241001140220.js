import React,{useEffect} from 'react';
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

import AdminLayout from './view/Admin/AdminLayout';
import AdminDasboard from './view/Admin/Dashboard/AdminDasboard';
import AdminProduct from './view/Admin/Product/ProductsPage';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './view/Admin/Product/AddProduct';
import AdminProductDetail from './view/Admin/Product/AdminProductDetail';
import { jwtDecode } from 'jwt-decode';
import { isJsonString } from './Service/ultils';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/sliders/userSlide';


function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(()=>{
    
    let storageData =  localStorage.getItem('accessToken');
    if(storageData && isJsonString(storageData)){
        storageData = JSON.parse(storageData)
        const decode = jwtDecode(storageData)
        if(decode?.id){
            try {
                 handelGetDetailUser(decode.id, storageData);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết người dùng:', error);
            }
        }
    
    }
    console.log('storageData',storageData);
    
  },[])

  const dispatch = useDispatch();
  const handelGetDetailUser = async (id, token) =>{
      const res = await GetDetailUser(id, token)

      dispatch(updateUser({ ...res?.data, access_token: token })); // Gửi action để cập nhật user
  }
  const GetDetailUser = async (id, access_token) =>{
      const res = await axios.get(`http://localhost:3001/api/user/getDetail/${id}`,{
          headers :{
              token: `Bearer ${access_token}`
          }
      })
      return res.data;
      
  }
  return (
    <div className="App">
      {!isAdminPage && <Header />} {/* Hiển thị Header nếu không phải trang admin */}
      {!isAdminPage && <TopNavigation />} {/* Hiển thị TopNavigation nếu không phải trang admin */}
    
     
        <Routes>
         
          <Route path='/' element={<Home />} />
          <Route path='/takecare' element={<TakeCare />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:name' element={<ProductDetail />} />
          <Route path='/company/:companyName' element={<ComProduct />} />
          <Route path='/userPage' element={<UserPage />} />
          <Route path='/admin/' element={<AdminLayout />}>
              <Route index element={<AdminDasboard />} /> 
              <Route path='dashboard' element={<AdminDasboard />} /> 
              <Route path='products' element={<AdminProduct />} /> 
              <Route path='orders' element={<AdminProduct />} /> 
              <Route path='customers' element={<AdminProduct />} /> 
              <Route path='addProduct' element={<AddProduct />} />  
              <Route path='adminProductDetail/:name' element={<AdminProductDetail />} />        
          </Route>
        </Routes>
     
      {!isAdminPage && <Footer />}
     
    </div>
  );
}

export default App;
