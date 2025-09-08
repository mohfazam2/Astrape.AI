"use client"

import { useState, useRef } from 'react';
import { Hero } from "@/components/hero";
import { Category } from "@/components/category";
import { Feature } from "@/components/Feature";
import { AllProducts } from "@/components/AllProducts";
import { NewArrival } from "@/components/NewArrival";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ELECTRONICS');
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      <AllProducts />
      <NewArrival />
    </div>
  );
}