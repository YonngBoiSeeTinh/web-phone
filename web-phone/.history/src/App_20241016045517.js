import React,{useEffect,useState} from 'react';
import TopNavigation from './view/Nav/TopNav';
import { useLocation } from 'react-router-dom';
import Home from './view/Home/Home';
import SeeAll from './view/Product/SeeAllProduct';
import Header from './view/Header/Header';
import Footer from './view/Footer/Footer';
import TakeCare from './view/Care/TakeCare';
import ProductDetail from './view/Product/ProductDetail';
import ComProduct from './view/Company/ComProduct';
import Cart from './view/Cart/Cart';
import EmployeeCart from './view/Cart/EmployeeCart';
import UserPage from './view/User/UserPage';
import AdminUserPage from './view/Admin/Customer/CustomerPage'

import AdminLayout from './view/Admin/AdminLayout';
import AdminDasboard from './view/Admin/Dashboard/AdminDasboard';
import AdminProduct from './view/Admin/Product/ProductsPage';
import EmployeePage from './view/Admin/Employee/EmployeePage';
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
import { useSelector } from 'react-redux';
import OrderPage from './view/Admin/Order/OrderPage';
import NonAcceptOrder from './view/Admin/Order/Order';
import AcceptOrder from './view/Admin/Order/OrderAccept';
import PaidedOrder from './view/Admin/Order/OrderPaid';

import EmployeeLayout from './view/Employee/EmployeeLayout'
import EmployeeDasboard from  './view/Employee/Dashboard/Dasboard'
import EmployeeProduct from  './view/Employee/Product/ProductsPage'
import EmployeeOrderPage from  './view/Employee/Order/OrderPage'
import EmployeeNonAcceptOrder from  './view/Employee/Order/Order'
import EmployeePaidedOrder from  './view/Employee/Order/OrderPaid'
import EmployeeAcceptOrder from  './view/Employee/Order/OrderAccept'

function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isEmployeePage = location.pathname.startsWith('/employee');
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => { 
    const result = handleDecode();
    if (result) {
        const { storageData, decode } = result;       
        if (decode?.id) {
            try {
                handelGetDetailUser(decode.id, storageData);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết người dùng:', error);
            }
        }
    }
    }, []);

const handleDecode = () => {
    let storageData = localStorage.getItem('accessToken');
    let decode = {};
    
    if (storageData && isJsonString(storageData)) {
        storageData = JSON.parse(storageData);
        decode = jwtDecode(storageData);
        return { decode, storageData };
    }
    
    return null;  // Trả về null nếu không có dữ liệu hợp lệ
};

axiosJWT.interceptors.response.use(function (config) {
    const result = handleDecode();
    if (result) {
        const { storageData, decode } = result;
        const currentDate = new Date();
        
        if (decode?.exp < currentDate.getTime() / 1000) { // mls
            const data = refresh_token();
            config.headers['token'] = `Bearer ${data?.access_token}`;
            console.log('Hết hạn access token:', data.access_token);
        }
    }
    
    return config;
}, function (error) {
    return Promise.reject(error);
});

const dispatch = useDispatch();
const handelGetDetailUser = async (id, token) => {
    const res = await GetDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
};

const user = useSelector((state) => state.user)
const [filter, setFilter] = useState("");
  return (
    <div className="App">
      {(!isAdminPage && !isEmployeePage) && <Header isSignIn={isSignIn} setIsSignIn={setIsSignIn} setFilter={setFilter}/>} {/* Hiển thị Header nếu không phải trang admin */}
      {(!isAdminPage && !isEmployeePage) && <TopNavigation />} {/* Hiển thị TopNavigation nếu không phải trang admin */}
    
     
        <Routes>
         
          <Route path='/' element={<Home filter={filter}/>} />
          <Route path='/seeAll' element={<SeeAll />} />
          <Route path='/takecare' element={<TakeCare />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/employeeCart' element={<EmployeeCart />} />
          <Route path='/product/:name' element={<ProductDetail />} />
          <Route path='/company/:companyName' element={<ComProduct />} />
          <Route path='/employeeOrder' element={<OrderPage style={{ width: '80%' }}/>} />
          <Route path='/userPage' element={<UserPage setIsSignIn={setIsSignIn} />} />
        
          <Route path='/admin/' element={<AdminLayout isAdmin ={user.isAdmin}/>}>
              <Route index element={<AdminDasboard />} /> 
              <Route path='dashboard' element={<AdminDasboard />} /> 
              <Route path='products' element={<AdminProduct />} ></Route>
              <Route path='orders' element={<OrderPage />} >
                 <Route path='nonAccept' element={<NonAcceptOrder />} /> 
                 <Route path='accept' element={<AcceptOrder />} /> 
                 <Route path='paied' element={<PaidedOrder />} /> 
              </Route> 
              <Route path='customers' element={<AdminUserPage />} /> 
              <Route path='employee' element={<EmployeePage />} /> 
              <Route path='addProduct' element={<AddProduct />} />  
              <Route path='updateProduct/:name' element={<UpdateProduct />} />        
          </Route>
          <Route path='/employee/' element={<EmployeeLayout isEmployee ={user.role === "employee"} user={user}/>}>
              <Route index element={<EmployeeLayout />} /> 
              <Route path='dashboard' element={<EmployeeDasboard />} /> 
              <Route path='products' element={<EmployeeProduct />} ></Route>
              <Route path='orders' element={<EmployeeOrderPage />} >
                 <Route path='nonAccept' element={<EmployeeNonAcceptOrder />} /> 
                 <Route path='accept' element={<EmployeeAcceptOrder />} /> 
                 <Route path='paied' element={<EmployeePaidedOrder />} /> 
              </Route> 
               
          </Route>
        </Routes>
     
      {!isAdminPage && <Footer />}
     
    </div>
  );
}

export default App;
