"use client"

import { useState, useRef, useEffect } from 'react';
import { Hero } from "@/components/hero";
import { Category } from "@/components/category";
import { Feature } from "@/components/Feature";
import { AllProducts } from "@/components/AllProducts";
import { NewArrival } from "@/components/NewArrival";
import { Footer } from '@/components/Footer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ELECTRONICS');
  const categoryRef = useRef<HTMLDivElement>(null);
  const allProductsRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollToProducts = () => {
      allProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToCategories = () => {
      categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('scrollToProducts', handleScrollToProducts);
    window.addEventListener('scrollToCategories', handleScrollToCategories);

    return () => {
      window.removeEventListener('scrollToProducts', handleScrollToProducts);
      window.removeEventListener('scrollToCategories', handleScrollToCategories);
    };
  }, []);

  return (
    <div className="w-full bg-white">
      <Hero onCategorySelect={handleCategorySelect} />
      <div ref={categoryRef}>
        <Category 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
      </div>
      <Feature />
      <div ref={allProductsRef}>
        <AllProducts />
      </div>
      <NewArrival />
      <Footer />
    </div>
  );
}