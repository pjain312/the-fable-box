import React from 'react';
import { ShoppingCart, Heart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCategory } from '../context/CategoryContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../data/products';
import Cart from './Cart';
// import Logo from './Logo';
import logo from '../assets/logo.png';


const Header = () => {
  const { getCartItemCount } = useCart();
  const { selectedCategory, setSelectedCategory } = useCategory();
  const cartItemCount = getCartItemCount();
  const [cartOpen, setCartOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Only show category buttons on home page
  const showCategories = location.pathname === '/';

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="focus:outline-none"
                aria-label="Go to home page"
              >
                <img src={logo} alt="logo" className="h-12 sm:h-16 md:h-20 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
              </button>
            </div>
            
            {/* Category Buttons - Hidden on mobile, shown on larger screens */}
            {showCategories && (
              <div className="hidden md:flex flex-wrap items-center justify-center gap-2 lg:gap-3 flex-1 max-w-4xl">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-semibold transition-all transform hover:scale-105 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-brand-purple-dark text-white shadow-md'
                        : 'bg-white text-brand-dark-gray hover:bg-brand-purple-lighter border-2 border-brand-purple'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
            
            {/* Cart and Heart Buttons */}
            <nav className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button className="p-1.5 sm:p-2 rounded-full hover:bg-brand-purple-lighter transition-colors">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple" />
              </button>
              
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-1.5 sm:p-2 rounded-full hover:bg-brand-purple-lighter transition-colors"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-dark-gray" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
          
          {/* Category Buttons - Mobile only, shown below on small screens */}
          {showCategories && (
            <div className="flex md:hidden flex-wrap items-center justify-center gap-2 mt-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-brand-purple-dark text-white shadow-md'
                      : 'bg-white text-brand-dark-gray hover:bg-brand-purple-lighter border-2 border-brand-purple'
                  }`}
                >
                  <span className="mr-1">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Overlay */}
      {cartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark-gray">
              Your Cart 🛒
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gray" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Cart 
              onClose={() => setCartOpen(false)} 
              onCheckout={() => {
                setCartOpen(false);
                navigate('/checkout');
              }} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

