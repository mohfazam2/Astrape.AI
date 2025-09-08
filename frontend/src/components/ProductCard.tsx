"use client"

import { useState } from 'react';
import { X, Edit3, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

interface EditProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onProductUpdated?: (product: Product) => void;
  onProductDeleted?: (productId: number) => void;
}

const EditProductPopup = ({ isOpen, onClose, product, onProductUpdated, onProductDeleted }: EditProductPopupProps) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    imageUrl: product.imageUrl,
    category: product.category
  });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { value: 'ELECTRONICS', label: 'Electronics' },
    { value: 'CLOTHING', label: 'Clothing' },
    { value: 'BOOKS', label: 'Books' },
    { value: 'FURNITURE', label: 'Furniture' },
    { value: 'GROCERIES', label: 'Groceries' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price greater than 0');
      return false;
    }
    if (!formData.imageUrl.trim()) {
      setError('Image URL is required');
      return false;
    }
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    
    try {
      new URL(formData.imageUrl);
    } catch {
      setError('Please enter a valid image URL');
      return false;
    }

    return true;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const token = localStorage.getItem('JWT');
    if (!token) {
      setError('Authentication token not found. Please login again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category
      };

      const response = await axios.put<Product>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/update/${product.id}`,
        productData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (onProductUpdated) {
        onProductUpdated(response.data);
      }

      onClose();
    } catch (err: any) {
      console.error('Error updating product:', err);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        localStorage.removeItem('JWT');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to update this product.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('JWT');
    if (!token) {
      setError('Authentication token not found. Please login again.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    setError(null);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/delete/${product.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (onProductDeleted) {
        onProductDeleted(product.id);
      }

      onClose();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        localStorage.removeItem('JWT');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to delete this product.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to delete product. Please try again.');
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !deleteLoading) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        imageUrl: product.imageUrl,
        category: product.category
      });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
          <button
            onClick={handleClose}
            disabled={loading || deleteLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading || deleteLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent disabled:opacity-50"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              disabled={loading || deleteLoading}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent disabled:opacity-50"
              placeholder="0.00"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              disabled={loading || deleteLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent disabled:opacity-50"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={loading || deleteLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent disabled:opacity-50"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image Preview */}
          {formData.imageUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
              <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
                <img
                  src={formData.imageUrl}
                  alt="Product preview"
                  className="w-full h-32 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="h-32 flex items-center justify-center text-gray-400">Invalid image URL</div>';
                  }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || deleteLoading}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {deleteLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading || deleteLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || deleteLoading}
              className="flex-1 px-4 py-2 bg-[#DB4444] text-white rounded-md hover:bg-[#d65e5e] disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
  
  const discountPercent = Math.floor(Math.random() * 20) + 5;
  const originalPrice = product.price / (1 - discountPercent / 100);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    console.log('Added to cart:', product);
  };

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

          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#DB4444] text-white py-2 px-4 rounded-lg hover:bg-[#c93939] transition-colors duration-200 font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <EditProductPopup
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={product}
        onProductUpdated={onProductUpdated}
        onProductDeleted={onProductDeleted}
      />
    </>
  );
};