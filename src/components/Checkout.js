import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import { CreditCard, Package, MapPin } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null); // 'prepaid' or 'cod'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setPaymentMethod(null); // Reset payment method when moving to step 2
    setStep(2);
  };
  

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate unique order ID
      const orderId = `TFB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Get current date in YYYY-MM-DD format
      const orderDate = new Date().toISOString().split('T')[0];
      
      // Order placed successfully
      setOrderPlaced(true);
      clearCart();
      
      // Navigate to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      console.error('Order placement error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    handlePlaceOrder();
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 text-center">
        <p className="text-lg sm:text-xl text-brand-gray mb-4">Your cart is empty!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-brand-purple-dark text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-brand-purple transition-all text-sm sm:text-base"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto text-center bg-brand-purple-lighter rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-lg border-2 border-brand-purple">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎉</div>
          <h2 className="text-2xl sm:text-4xl font-bold text-brand-dark-gray mb-3 sm:mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-4 sm:mb-6">
            Thank you for your purchase! Your order is being processed.
          </p>
          <p className="text-sm sm:text-base text-brand-gray-light">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-brand-dark-gray mb-6 sm:mb-8">
          Checkout 🛒
        </h2>

        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div
              className={`flex items-center space-x-1 sm:space-x-2 ${
                step >= 1 ? 'text-brand-purple-dark' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                  step >= 1
                    ? 'bg-brand-purple-dark text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step > 1 ? '✓' : '1'}
              </div>
              <span className="font-semibold text-xs sm:text-base">Shipping</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-gray-200">
              <div
                className={`h-full transition-all ${
                  step >= 2 ? 'bg-brand-purple-dark' : 'bg-gray-200'
                }`}
              />
            </div>
            <div
              className={`flex items-center space-x-1 sm:space-x-2 ${
                step >= 2 ? 'text-brand-purple-dark' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                  step >= 2
                    ? 'bg-brand-purple-dark text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                2
              </div>
              <span className="font-semibold text-xs sm:text-base">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {step === 1 ? (
              <form
                onSubmit={handleShippingSubmit}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-dark" />
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark-gray">
                    Shipping Details
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label.Root
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </Label.Root>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email *
                    </Label.Root>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone *
                    </Label.Root>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="address"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Address *
                    </Label.Root>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      City *
                    </Label.Root>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="state"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      State *
                    </Label.Root>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="zipCode"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      ZIP Code *
                    </Label.Root>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="country"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Country *
                    </Label.Root>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-purple-dark text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-brand-purple transition-all transform hover:scale-105 shadow-md text-sm sm:text-base"
                >
                  Continue to Payment
                </button>
              </form>
            ) : paymentMethod === null ? (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-dark" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Select Payment Method
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('prepaid');
                      setError(null);
                    }}
                    className="p-6 border-2 border-brand-purple-light rounded-xl hover:border-brand-purple-dark hover:bg-brand-purple-lighter transition-all text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple-dark group-hover:scale-110 transition-transform" />
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">Prepaid / Card</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      Pay securely with your credit or debit card
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('cod');
                      setError(null);
                    }}
                    className="p-6 border-2 border-brand-purple-light rounded-xl hover:border-brand-purple-dark hover:bg-brand-purple-lighter transition-all text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple-dark group-hover:scale-110 transition-transform" />
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">Cash on Delivery</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      Pay cash when your order is delivered
                    </p>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-gray-300 transition-all text-sm sm:text-base"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : paymentMethod === 'cod' ? (
              <form
                onSubmit={handlePaymentSubmit}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-dark" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Cash on Delivery
                  </h3>
                </div>

                <div className="bg-brand-purple-lighter rounded-lg p-4 sm:p-6 border-2 border-brand-purple-light">
                  <p className="text-sm sm:text-base text-gray-700 mb-2">
                    <span className="font-semibold">Payment Method:</span> Cash on Delivery
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    You will pay ₹{(total + 50).toFixed(2)} in cash when your order is delivered.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <p className="text-sm sm:text-base text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod(null);
                      setError(null);
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 text-gray-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-gray-300 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-brand-purple-dark text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-brand-purple transition-all transform hover:scale-105 shadow-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? 'Placing Order...' : 'Place Order 🎉'}
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handlePaymentSubmit}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-dark" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Payment Details
                  </h3>
                </div>

                <div>
                  <Label.Root
                    htmlFor="cardNumber"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Card Number *
                  </Label.Root>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setFormData({ ...formData, cardNumber: formatted });
                    }}
                    className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <Label.Root
                    htmlFor="cardName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Cardholder Name *
                  </Label.Root>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label.Root
                      htmlFor="expiryDate"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Expiry Date *
                    </Label.Root>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setFormData({ ...formData, expiryDate: value });
                      }}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <Label.Root
                      htmlFor="cvv"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      CVV *
                    </Label.Root>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      placeholder="123"
                      maxLength="3"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                        setFormData({ ...formData, cvv: value });
                      }}
                      className="w-full px-4 py-2 border-2 border-brand-purple-light rounded-lg focus:border-brand-purple-dark focus:outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <p className="text-sm sm:text-base text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod(null);
                      setError(null);
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 text-gray-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-gray-300 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-brand-purple-dark text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-brand-purple transition-all transform hover:scale-105 shadow-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? 'Placing Order...' : 'Place Order 🎉'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="bg-brand-purple-lighter rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24 border-2 border-brand-purple-light order-1 lg:order-2">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-dark" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Order Summary</h3>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 max-h-48 sm:max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 text-sm"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-brand-dark-gray truncate text-xs sm:text-sm">
                            {item.name}
                          </p>
                          {item.color && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <div
                                className="w-3 h-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.color.value }}
                              />
                              <span className="text-gray-500 text-xs">{item.color.name}</span>
                            </div>
                          )}
                          <p className="text-gray-500 text-xs mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-brand-purple-dark flex-shrink-0 text-xs sm:text-sm">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-brand-purple-light pt-3 sm:pt-4 space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₹50.00</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-brand-dark-gray pt-2 border-t-2 border-brand-purple-light">
                  <span>Total</span>
                  <span>₹{(total + 50).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

