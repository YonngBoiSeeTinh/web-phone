import React from 'react';
import TopNavigation from './view/Nav/TopNav';
import Home from './view/Home/Home';
import Header from './view/Header/Header';
import Footer from './view/Footer/Footer';
import TakeCare from './view/Care/TakeCare';
import ProductDetail from './view/Product/ProductDetail';
import ComProduct from './view/Company/ComProduct';
import Cart from './view/Cart/Cart';
import UserPage from './view/User/UserPage';

import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <TopNavigation />
        <section>
          <Routes>
            <Route path='/' element={<Home  />} />
            <Route path='/takecare' element={<TakeCare />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:name' element={<ProductDetail />} />
            <Route path='/company/:companyName' element={<ComProduct/>} />
            <Route path='/userPage/:id' element={<UserPage />} />
          </Routes>
        </section>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
