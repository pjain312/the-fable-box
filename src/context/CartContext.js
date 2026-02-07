import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product, selectedColor) => {
    setCart((prevCart) => {
      // Create unique key: productId + color (or null if no color)
      const colorName = selectedColor?.name || null;
      const itemKey = `${product.id}-${colorName}`;
      const existingItem = prevCart.find((item) => {
        const itemColorName = item.color?.name || null;
        return `${item.id}-${itemColorName}` === itemKey;
      });
      
      if (existingItem) {
        // Maximum 20 items per product-color combination
        if (existingItem.quantity >= 20) {
          return prevCart;
        }
        return prevCart.map((item) => {
          const itemColorName = item.color?.name || null;
          return `${item.id}-${itemColorName}` === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
      return [...prevCart, { ...product, quantity: 1, color: selectedColor || null }];
    });
  };

  const removeFromCart = (productId, colorName) => {
    setCart((prevCart) => 
      prevCart.filter((item) => {
        const itemColorName = item.color?.name || null;
        const searchColorName = colorName || null;
        return !(item.id === productId && itemColorName === searchColorName);
      })
    );
  };

  const updateQuantity = (productId, colorName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName);
      return;
    }
    // Maximum 20 items per product-color combination
    if (quantity > 20) {
      quantity = 20;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        const itemColorName = item.color?.name || null;
        const searchColorName = colorName || null;
        return item.id === productId && itemColorName === searchColorName
          ? { ...item, quantity }
          : item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

