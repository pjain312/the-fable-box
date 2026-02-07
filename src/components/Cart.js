import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

const Cart = ({ onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const total = getCartTotal();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      onClose();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Your cart is empty! 🛒</p>
        <p className="text-gray-400 mt-2">Add some cute items to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${item.color?.name || 'default'}-${index}`}
            className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-brand-purple-lighter rounded-lg border border-brand-purple-light"
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-brand-dark-gray text-sm sm:text-base line-clamp-2">{item.name}</h3>
              {item.color && (
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: item.color.value }}
                  />
                  <span className="text-xs text-brand-gray">{item.color.name}</span>
                </div>
              )}
              <p className="text-xs sm:text-sm text-brand-gray mt-1">₹{item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.color?.name, item.quantity - 1)}
                className="p-1 rounded-full bg-brand-purple hover:bg-brand-purple-dark transition-colors text-white"
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <span className="w-6 sm:w-8 text-center font-semibold text-brand-dark-gray text-sm sm:text-base">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.color?.name, item.quantity + 1)}
                className="p-1 rounded-full bg-brand-purple hover:bg-brand-purple-dark transition-colors text-white"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.color?.name)}
                className="p-1 rounded-full bg-red-200 hover:bg-red-300 transition-colors"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t-2 border-brand-purple-light pt-3 sm:pt-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <span className="text-lg sm:text-xl font-bold text-brand-dark-gray">Total:</span>
          <span className="text-xl sm:text-2xl font-bold text-brand-purple-dark">
            ₹{total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-brand-purple-dark text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-brand-purple transition-all transform hover:scale-105 shadow-md text-sm sm:text-base"
        >
          Checkout 🛒
        </button>
      </div>
    </div>
  );
};

export default Cart;

