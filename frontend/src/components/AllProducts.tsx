"use client"

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios"

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: string;
}

export const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const PRODUCTS_PER_ROW = 4; // Based on lg:grid-cols-4
    const ROWS_TO_SHOW = 2;
    const INITIAL_PRODUCTS_COUNT = PRODUCTS_PER_ROW * ROWS_TO_SHOW; // 8 products

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

    const handleViewToggle = () => {
        setShowAll(!showAll);
    };

    // Determine which products to display
    const displayedProducts = showAll ? products : products.slice(0, INITIAL_PRODUCTS_COUNT);
    const hasMoreProducts = products.length > INITIAL_PRODUCTS_COUNT;

    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4">
                <div className="bg-[#DB4444] w-5 h-10 rounded" />
                <span className="text-[#DB4444] text-[18px]">Our Products</span>
            </div>

            <div className="flex justify-between">
                <h3 className="text-[48px] capitalize">Explore Our Products</h3>
            </div>

            {loading ? (
                <div className="py-8 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DB4444]"></div>
                </div>
            ) : error ? (
                <div className="py-8 text-center text-red-500">
                    Error: {error}
                </div>
            ) : products.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-gray-400 mt-2">Check back later for new items! or you can add new products from the top nav bar</p>
                </div>
            ) : (
                <>
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    {hasMoreProducts && (
                        <div className="w-full flex justify-center py-4">
                            <button 
                                onClick={handleViewToggle}
                                className="bg-[#DB4444] text-white h-14 px-8 rounded hover:bg-[#d65e5e] cursor-pointer transition-colors"
                            >
                                {showAll ? 'Show Less' : `View All Products (${products.length})`}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}