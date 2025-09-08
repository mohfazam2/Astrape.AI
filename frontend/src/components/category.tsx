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

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ELECTRONICS');
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

  useEffect(() => {
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

    fetchProducts();
  }, []);

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

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
    <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6 h-full">
      <div className="w-full h-[1px] bg-gray-300" />
      <div className="flex items-center gap-4">
        <div className="bg-[#DB4444] w-5 h-10 rounded" />
        <span className="text-[#DB4444] text-[18px]">Categories</span>
      </div>
      <div>
        <h3 className="text-[48px]">Browse By Category</h3>
      </div>
      <div className="flex w-full justify-between">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`border-1 border-gray-300 h-36 w-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer ${
              selectedCategory === category.id ? 'bg-[#DB4444] text-white' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.icon}
            <span className="py-2">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-[1px] bg-gray-300" />
      
      {/* Products by selected category */}
      <div>
        <div className="flex items-center gap-4">
          <div className="bg-[#DB4444] w-5 h-10 rounded" />
          <span className="text-[#DB4444] text-[18px]">Categories</span>
        </div>

        <div className="flex justify-between">
          <h3 className="text-[48px] capitalize">{selectedCategory.toLowerCase()}</h3>
          {hasMoreProducts && !loading && filteredProducts.length > 0 && (
            <button 
              onClick={handleViewToggle}
              className="bg-[#DB4444] text-white h-14 px-6 rounded hover:bg-[#d65e5e] cursor-pointer transition-colors"
            >
              {showAll ? 'Show Less' : `View All (${filteredProducts.length})`}
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DB4444]"></div>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            Error: {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-xl text-gray-500">No products found in {selectedCategory} category</p>
            <p className="text-gray-400 mt-2">Check back later for new items!</p>
          </div>
        ) : (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};