"use client"

import { useState, useEffect } from 'react';
import { TabletSmartphone, Shirt, Book, Lamp, Apple } from "lucide-react";
import {ProductCard} from "@/components/ProductCard"
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

interface ApiResponse {
  data: Product[];
}

interface CategoryProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const Category = ({ selectedCategory: externalSelectedCategory, onCategoryChange }: CategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(externalSelectedCategory || 'ELECTRONICS');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const PRODUCTS_PER_ROW = 4; 
  const ROWS_TO_SHOW = 1; 
  const INITIAL_PRODUCTS_COUNT = PRODUCTS_PER_ROW * ROWS_TO_SHOW; 
  
  const categories = [
    { id: 'ELECTRONICS', name: 'ELECTRONICS', icon: <TabletSmartphone size={38} /> },
    { id: 'CLOTHING', name: 'CLOTHING', icon: <Shirt size={38} /> },
    { id: 'BOOKS', name: 'Books', icon: <Book size={38} /> },
    { id: 'FURNITURE', name: 'FURNITURE', icon: <Lamp size={38} /> },
    { id: 'GROCERIES', name: 'GROCERIES', icon: <Apple size={38} /> },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/product/fetch`);
      
      const productsData = response.data as Product[];
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update internal state when external prop changes
  useEffect(() => {
    if (externalSelectedCategory) {
      setSelectedCategory(externalSelectedCategory);
    }
  }, [externalSelectedCategory]);

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  // Handle product update
  const handleProductUpdated = async (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    // Refetch to ensure latest data
    await fetchProducts();
  };

  // Handle product deletion
  const handleProductDeleted = (deletedProductId: number) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== deletedProductId)
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  const filteredProducts = products.filter(product => 
    product.category === selectedCategory
  );

  const handleViewToggle = () => {
    setShowAll(!showAll);
  };

  // Determine which products to display
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, INITIAL_PRODUCTS_COUNT);
  const hasMoreProducts = filteredProducts.length > INITIAL_PRODUCTS_COUNT;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-4 sm:gap-6 h-full">
      <div className="w-full h-[1px] bg-gray-300" />
      <div className="flex items-center gap-4">
        <div className="bg-[#DB4444] w-4 sm:w-5 h-8 sm:h-10 rounded" />
        <span className="text-[#DB4444] text-sm sm:text-[18px]">Categories</span>
      </div>
      <div>
        <h3 className="text-2xl sm:text-4xl lg:text-[48px] font-semibold">Browse By Category</h3>
      </div>
      
      {/* Responsive categories grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`border border-gray-300 h-24 sm:h-32 lg:h-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer transition-colors ${
              selectedCategory === category.id ? 'bg-[#DB4444] text-white' : 'hover:text-white'
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="mb-1 sm:mb-2">
              <TabletSmartphone size={category.id === 'ELECTRONICS' ? 24 : 0} className="sm:hidden" />
              <Shirt size={category.id === 'CLOTHING' ? 24 : 0} className="sm:hidden" />
              <Book size={category.id === 'BOOKS' ? 24 : 0} className="sm:hidden" />
              <Lamp size={category.id === 'FURNITURE' ? 24 : 0} className="sm:hidden" />
              <Apple size={category.id === 'GROCERIES' ? 24 : 0} className="sm:hidden" />
              
              <TabletSmartphone size={category.id === 'ELECTRONICS' ? 32 : 0} className="hidden sm:block lg:hidden" />
              <Shirt size={category.id === 'CLOTHING' ? 32 : 0} className="hidden sm:block lg:hidden" />
              <Book size={category.id === 'BOOKS' ? 32 : 0} className="hidden sm:block lg:hidden" />
              <Lamp size={category.id === 'FURNITURE' ? 32 : 0} className="hidden sm:block lg:hidden" />
              <Apple size={category.id === 'GROCERIES' ? 32 : 0} className="hidden sm:block lg:hidden" />
              
              {/* Desktop icons */}
              <span className="hidden lg:block">
                {category.icon}
              </span>
            </div>
            <span className="text-xs sm:text-sm lg:text-base text-center px-1 leading-tight">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full h-[1px] bg-gray-300" />
      
      {/* Products by selected category */}
      <div>
        <div className="flex items-center gap-4">
          <div className="bg-[#DB4444] w-4 sm:w-5 h-8 sm:h-10 rounded" />
          <span className="text-[#DB4444] text-sm sm:text-[18px]">Categories</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
          <h3 className="text-2xl sm:text-4xl lg:text-[48px] capitalize font-semibold">
            {selectedCategory.toLowerCase()}
          </h3>
          {hasMoreProducts && !loading && filteredProducts.length > 0 && (
            <button 
              onClick={handleViewToggle}
              className="bg-[#DB4444] text-white h-12 sm:h-14 px-4 sm:px-6 rounded hover:bg-[#d65e5e] cursor-pointer transition-colors text-sm sm:text-base"
            >
              {showAll ? 'Show Less' : `View All (${filteredProducts.length})`}
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#DB4444]"></div>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500 px-4">
            <p className="text-sm sm:text-base">Error: {error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-8 text-center px-4">
            <p className="text-lg sm:text-xl text-gray-500">No products found in {selectedCategory} category</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Check back later for new items!</p>
          </div>
        ) : (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onProductUpdated={handleProductUpdated}
                onProductDeleted={handleProductDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};