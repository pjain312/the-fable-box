import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  // Count total quantity across all colors for this product
  const totalQuantity = cart
    .filter((item) => item.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-brand-purple cursor-pointer"
    >
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4 text-center flex justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-brand-dark-gray mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-brand-gray text-xs sm:text-sm mb-3 sm:mb-4 min-h-[40px] line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold text-brand-purple-dark">
            ₹{product.price.toFixed(2)}
          </span>
          {totalQuantity > 0 && (
            <span className="text-sm text-brand-gray bg-brand-purple-lighter px-3 py-1 rounded-full">
              {totalQuantity} in cart
            </span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 flex gap-1.5 justify-center">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-brand-gray">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

