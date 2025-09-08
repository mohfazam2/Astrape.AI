"use client"

import { useState, useEffect } from 'react';
import { Edit3, Plus, Minus } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface CartResponse {
  Message: string;
  cart: {
    id: number;
    userId: number;
    items: CartItem[];
  };
}

export const ProductCard = ({ 
  product, 
  onProductUpdated, 
  onProductDeleted 
}: { 
  product: Product;
  onProductUpdated?: (product: Product) => void;
  onProductDeleted?: (productId: number) => void;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  
  const discountPercent = Math.floor(Math.random() * 20) + 5;
  const originalPrice = product.price / (1 - discountPercent / 100);

  // Fetch current cart quantity for this product
  const fetchCartQuantity = async () => {
    const token = localStorage.getItem('JWT');
    if (!token) {
      setCartQuantity(0);
      return;
    }

    try {
      const response = await axios.get<CartResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/list`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const cartItem = response.data.cart?.items?.find(item => item.product.id === product.id);
      setCartQuantity(cartItem?.quantity || 0);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartQuantity(0);
    }
  };

  // Load cart quantity on mount
  useEffect(() => {
    fetchCartQuantity();
  }, [product.id]);

  const updateCartQuantity = async (quantityChange: number) => {
    const token = localStorage.getItem('JWT');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    // Optimistic update
    const newQuantity = Math.max(0, cartQuantity + quantityChange);
    setCartQuantity(newQuantity);
    setUpdating(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/update`,
        { 
          productId: product.id, 
          quantityChange 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
    } catch (err: any) {
      console.error('Error updating cart:', err);
      // Revert optimistic update on error
      setCartQuantity(cartQuantity);
      
      if (err.response?.status === 401) {
        alert('Please login to add items to cart');
        localStorage.removeItem('JWT');
      } else {
        alert('Failed to update cart');
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleAddToCart = () => updateCartQuantity(1);
  const handleIncreaseQuantity = () => updateCartQuantity(1);
  const handleDecreaseQuantity = () => updateCartQuantity(-1);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditOpen(true);
  };
  
  return (
    <>
      <div className="min-h-[400px] max-w-[270px] border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer relative">
        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10"
        >
          <Edit3 size={16} className="text-gray-600 hover:text-[#DB4444]" />
        </button>

        <div className="min-h-[250px] flex justify-center items-center p-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-[200px] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x200?text=No+Image";
            }}
          />
        </div>

        <div className="flex flex-col px-4 pb-4 gap-2">
          <span className="font-semibold text-lg text-gray-900 truncate">{product.name}</span>

          <div className="flex items-center gap-3">
            <span className="text-[#DB4444] font-bold text-lg">${product.price.toFixed(2)}</span>
            <span className="text-gray-400 line-through text-sm">${originalPrice.toFixed(2)}</span>
          </div>

          <div className="flex gap-1 text-yellow-400 mb-3">
            {"★".repeat(Math.floor(Math.random() * 3 + 3))}
            {"☆".repeat(2)}
            <span className="text-gray-400 text-sm ml-2">
              ({Math.floor(Math.random() * 100 + 10)})
            </span>
          </div>

          {/* Cart Controls */}
          {cartQuantity === 0 ? (
            // Show "Add to Cart" button when not in cart
            <button 
              onClick={handleAddToCart}
              disabled={updating}
              className={`w-full bg-[#DB4444] text-white py-2 px-4 rounded-lg hover:bg-[#c93939] transition-all duration-200 font-medium flex items-center justify-center ${
                updating ? 'opacity-50' : ''
              }`}
            >
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          ) : (
            // Show quantity controls when in cart
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecreaseQuantity}
                disabled={updating}
                className={`w-10 h-10 rounded-lg border-2 border-[#DB4444] text-[#DB4444] flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-all duration-200 ${
                  updating ? 'opacity-50' : ''
                }`}
              >
                <Minus size={16} />
              </button>
              
              <div className="flex-1 text-center">
                <span className="text-lg font-semibold text-gray-900">{cartQuantity}</span>
                <p className="text-xs text-gray-500">in cart</p>
              </div>
              
              <button
                onClick={handleIncreaseQuantity}
                disabled={updating}
                className={`w-10 h-10 rounded-lg bg-[#DB4444] text-white flex items-center justify-center hover:bg-[#c93939] transition-all duration-200 ${
                  updating ? 'opacity-50' : ''
                }`}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};