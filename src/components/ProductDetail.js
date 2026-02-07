import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();
  const product = products.find((p) => p.id === parseInt(id));
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-brand-purple-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-purple transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const selectedColor = product.colors?.[selectedColorIndex] || product.colors?.[0];
  const cartItem = cart.find(
    (item) => item.id === product.id && (item.color?.name === selectedColor?.name || (!item.color && !selectedColor))
  );
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0) {
      if (selectedColor) {
        addToCart(product, selectedColor);
      }
    } else {
      // Product without colors
      addToCart(product, null);
    }
  };

  const handleIncrease = () => {
    if (cartQuantity >= 20) {
      return;
    }
    if (cartQuantity === 0) {
      if (product.colors && product.colors.length > 0 && selectedColor) {
        addToCart(product, selectedColor);
      } else {
        addToCart(product, null);
      }
    } else {
      const colorName = selectedColor?.name || null;
      updateQuantity(product.id, colorName, cartQuantity + 1);
    }
  };

  const handleDecrease = () => {
    const colorName = selectedColor?.name || null;
    if (cartQuantity > 1) {
      updateQuantity(product.id, colorName, cartQuantity - 1);
    } else {
      updateQuantity(product.id, colorName, 0);
    }
  };

  const nextColor = () => {
    if (product.colors && product.colors.length > 1) {
      setSelectedColorIndex((prev) => (prev + 1) % product.colors.length);
    }
  };

  const prevColor = () => {
    if (product.colors && product.colors.length > 1) {
      setSelectedColorIndex((prev) => (prev - 1 + product.colors.length) % product.colors.length);
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-4 sm:mb-6 flex items-center text-brand-purple-dark hover:text-brand-purple transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Image Carousel */}
        <div className="relative">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
            <img
              src={selectedColor?.image || product.image}
              alt={`${product.name} - ${selectedColor?.name}`}
              className="w-full h-64 sm:h-96 object-contain"
            />
            
            {product.colors && product.colors.length > 1 && (
              <>
                <button
                  onClick={prevColor}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  aria-label="Previous color"
                >
                  <ChevronLeft className="w-5 h-5 text-brand-purple-dark" />
                </button>
                <button
                  onClick={nextColor}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  aria-label="Next color"
                >
                  <ChevronRight className="w-5 h-5 text-brand-purple-dark" />
                </button>
                
                {/* Color Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorIndex(index)}
                      className={`w-3 h-3 rounded-full border-2 transition-all ${
                        index === selectedColorIndex
                          ? 'border-brand-purple-dark scale-125'
                          : 'border-white'
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark-gray mb-2">
              {product.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-brand-purple-dark mb-4">
              ₹{product.price.toFixed(2)}
            </p>
            <p className="text-brand-gray text-base sm:text-lg">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold text-brand-dark-gray mb-3">
                Select Color: <span className="text-brand-purple-dark">{selectedColor?.name}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      index === selectedColorIndex
                        ? 'border-brand-purple-dark bg-brand-purple-lighter'
                        : 'border-gray-300 hover:border-brand-purple'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-sm font-medium">{color.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="pt-4 border-t border-gray-200">
            {cartQuantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-brand-purple-dark text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-brand-purple transition-all transform hover:scale-105 shadow-md flex items-center justify-center space-x-2 text-base sm:text-lg"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-4 bg-brand-purple-lighter rounded-xl p-4">
                <button
                  onClick={handleDecrease}
                  className="p-2 rounded-full bg-brand-purple hover:bg-brand-purple-dark transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cartQuantity === 0}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-dark-gray">{cartQuantity}</div>
                  <div className="text-sm text-brand-gray">in cart</div>
                </div>
                <button
                  onClick={handleIncrease}
                  className="p-2 rounded-full bg-brand-purple hover:bg-brand-purple-dark transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cartQuantity >= 20}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

