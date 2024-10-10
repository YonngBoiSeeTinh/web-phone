import React, { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'; // Import jwtDecode
import axios from 'axios'; 
import { updateUser } from './Redux/sliders/userSlide';
import { GetDetailUser, refresh_token, axiosJWT } from './Service/UserService';
import { isJsonString } from './Service/ultils';
import Header from './view/Header/Header';
import TopNavigation from './view/Nav/TopNav';
import Footer from './view/Footer/Footer';
import Home from './view/Home/Home';
import TakeCare from './view/Care/TakeCare';
import ProductDetail from './view/Product/ProductDetail';
import ComProduct from './view/Company/ComProduct';
import Cart from './view/Cart/Cart';
import UserPage from './view/User/UserPage';
import AdminLayout from './view/Admin/AdminLayout';
import AdminDasboard from './view/Admin/Dashboard/AdminDasboard';
import AdminProduct from './view/Admin/Product/ProductsPage';
import AddProduct from './view/Admin/Product/AddProduct';
import AdminProductDetail from './view/Admin/Product/AdminProductDetail';
import './style.css';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decode } = handleDecode();

    if (decode?.id) {
      try {
        handleGetDetailUser(decode.id, storageData);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết người dùng:', error);
      }
    }
  }, [dispatch]);

  const handleDecode = () => {
    let storageData = localStorage.getItem('accessToken');
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decode = jwtDecode(storageData);
      return { decode, storageData };
    }
    return {};
  };

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await GetDetailUser(id, token);
      dispatch(updateUser({ ...res.data, access_token: token })); // Gửi action để cập nhật user
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  // Cấu hình interceptor cho axios
  axiosJWT.interceptors.response.use(
    async (config) => {
      const { storageData, decode } = handleDecode();
      const currentDate = new Date();

      if (decode?.exp < currentDate.getTime() / 1000) {
        // Nếu token hết hạn, refresh token
        const data = await refresh_token();
        localStorage.setItem('accessToken', JSON.stringify(data.access_token)); // Lưu token mới
        config.headers['token'] = `Bearer ${data.access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <div className="App">
      {!isAdminPage && <Header />}
      {!isAdminPage && <TopNavigation />}
      
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
