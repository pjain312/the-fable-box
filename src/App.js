import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from './context/CategoryContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import whiteLogo from './assets/white-logo.png';
import './App.css';

function App() {
  return (
    <CartProvider>
      <CategoryProvider>
        <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          
          <footer className="bg-[#6B4A75] mt-12 sm:mt-16 py-8 sm:py-10">
            <div className="container mx-auto px-3 sm:px-4 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <img 
                  src={whiteLogo} 
                  alt="The Fable Box Logo" 
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
                />
                {/* <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">THE FABLE BOX</h3>
                  <p className="text-white/80 text-xs sm:text-sm italic mt-1">Gifting & Hampers</p>
                </div> */}
              </div>
              <p className="text-white/90 text-sm sm:text-base mb-2">
                Bringing joy and cuteness to kids everywhere! ✨
              </p>
              <p className="text-white/70 text-xs sm:text-sm">
                © 2025 The Fable Box. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;
