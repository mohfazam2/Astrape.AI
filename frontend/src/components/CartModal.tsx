"use client"

import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}
interface CartResponse {
  cart: {
    items: CartItem[];
  };
}


interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());


  const fetchCartItems = async () => {
    const token = localStorage.getItem('JWT');
    if (!token) {
      setError('Please login to view cart');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<CartResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/list`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // Fixed: Access cart.items instead of just items
      setCartItems(response.data.cart?.items || []);
    } catch (err: any) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        setError('Please login to view cart');
        localStorage.removeItem('JWT');
      } else {
        setError('Failed to load cart items');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantityChange: number) => {
    const token = localStorage.getItem('JWT');
    if (!token) {
      setError('Please login to update cart');
      return;
    }

     setUpdatingItems(prev => new Set(prev).add(productId));

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/update`,
        { productId, quantityChange }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      fetchCartItems();
    } catch (err: any) {
      console.error('Error updating cart:', err);
      setError('Failed to update cart item');
    }
  };

  const removeItem = (productId: number) => {
    // This will send a negative quantityChange to remove all items
    const currentItem = cartItems.find(item => item.product.id === productId);
    if (currentItem) {
      updateQuantity(productId, -currentItem.quantity);
    }
  };

  const increaseQuantity = (productId: number) => {
    updateQuantity(productId, 1);
  };

  const decreaseQuantity = (productId: number) => {
    updateQuantity(productId, -1);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={20} className="sm:hidden" />
            <ShoppingCart size={24} className="hidden sm:block" />
            <span className="hidden xs:inline">Shopping Cart</span>
            <span className="xs:hidden">Cart</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={20} className="sm:hidden" />
            <X size={24} className="hidden sm:block" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-[#DB4444]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm">
              {error}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <ShoppingCart size={36} className="mx-auto text-gray-300 mb-3 sm:hidden" />
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4 hidden sm:block" />
              <p className="text-sm sm:text-base text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/64x64?text=No+Image";
                    }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.product.name}</h3>
                    <p className="text-[#DB4444] font-bold text-sm sm:text-base">${item.product.price.toFixed(2)}</p>
                  </div>

                  {/* Mobile Layout - Stacked */}
                  <div className="flex flex-col items-end gap-2 sm:hidden">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      
                      <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                      
                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className={`text-red-500 hover:text-red-700 text-xs transition-all duration-200 ${
                          updatingItems.has(item.product.id) ? 'opacity-50' : ''
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout - Horizontal */}
                  <div className="hidden sm:flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.product.id)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    
                    <button
                      onClick={() => increaseQuantity(item.product.id)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="hidden sm:block text-right">
                    <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className={`text-red-500 hover:text-red-700 text-sm mt-1 transition-all duration-200 ${
                        updatingItems.has(item.product.id) ? 'opacity-50' : ''
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-3 sm:p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-base sm:text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Continue Shopping
              </button>
              <button
                className="flex-1 px-3 sm:px-4 py-2 bg-[#DB4444] text-white rounded-md hover:bg-[#d65e5e] transition-colors text-sm sm:text-base"
                onClick={() => {
                  alert('Checkout functionality coming soon!');
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};