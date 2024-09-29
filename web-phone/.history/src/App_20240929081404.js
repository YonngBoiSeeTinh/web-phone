import React from 'react';
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
import AdminDasboard from './view/Admin/AdminDasboard';
import AdminProduct from './view/Admin/ProductsPage';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  return (
    <div className="App">
      {!isAdminPage && <Header />} {/* Hiển thị Header nếu không phải trang admin */}
      {!isAdminPage && <TopNavigation />} {/* Hiển thị TopNavigation nếu không phải trang admin */}
    
      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/takecare' element={<TakeCare />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:name' element={<ProductDetail />} />
          <Route path='/company/:companyName' element={<ComProduct />} />
          <Route path='/userPage/:id' element={<UserPage />} />
          <Route path='/admin/' element={<AdminLayout />}>
              <Route index element={<AdminDasboard />} /> 
              <Route path='products' element={<AdminProduct />} /> 
            
          </Route>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
