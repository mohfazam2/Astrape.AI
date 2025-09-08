"use client"

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Filter, X, ChevronDown } from "lucide-react";
import axios from "axios"

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: string;
}

interface Filters {
    category: string;
    priceRange: string;
    sortBy: string;
}

export const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        category: 'all',
        priceRange: 'all',
        sortBy: 'newest'
    });

    const PRODUCTS_PER_ROW = 4; // Based on lg:grid-cols-4
    const ROWS_TO_SHOW = 2;
    const INITIAL_PRODUCTS_COUNT = PRODUCTS_PER_ROW * ROWS_TO_SHOW; // 8 products

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'ELECTRONICS', label: 'Electronics' },
        { value: 'CLOTHING', label: 'Clothing' },
        { value: 'BOOKS', label: 'Books' },
        { value: 'FURNITURE', label: 'Furniture' },
        { value: 'GROCERIES', label: 'Groceries' }
    ];

    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '0-25', label: 'Under $25' },
        { value: '25-50', label: '$25 - $50' },
        { value: '50-100', label: '$50 - $100' },
        { value: '100-500', label: '$100 - $500' },
        { value: '500+', label: '$500+' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-az', label: 'Name: A to Z' },
        { value: 'name-za', label: 'Name: Z to A' }
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

    const handleFilterChange = (filterType: keyof Filters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setShowAll(false); // Reset to show initial count when filters change
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            priceRange: 'all',
            sortBy: 'newest'
        });
        setShowAll(false);
    };

    const hasActiveFilters = filters.category !== 'all' || filters.priceRange !== 'all' || filters.sortBy !== 'newest';

    // Apply filters and sorting
    const getFilteredProducts = () => {
        let filtered = [...products];

        // Category filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Price range filter
        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
            filtered = filtered.filter(product => {
                if (filters.priceRange === '500+') {
                    return product.price >= 500;
                }
                const minPrice = parseFloat(min);
                const maxPrice = parseFloat(max);
                return product.price >= minPrice && product.price <= maxPrice;
            });
        }

        // Sorting
        switch (filters.sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-az':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-za':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();
    const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, INITIAL_PRODUCTS_COUNT);
    const hasMoreProducts = filteredProducts.length > INITIAL_PRODUCTS_COUNT;

    const handleViewToggle = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4">
                <div className="bg-[#DB4444] w-5 h-10 rounded" />
                <span className="text-[#DB4444] text-[18px]">Our Products</span>
            </div>

            <div className="flex justify-between items-center">
                <h3 className="text-[48px] capitalize">Explore Our Products</h3>
                
                {/* Filter Toggle Button */}
                <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#DB4444] transition-colors"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                    )}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                            showFilters || hasActiveFilters
                                ? 'bg-[#DB4444] text-white border-[#DB4444]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#DB4444]'
                        }`}
                    >
                        <Filter size={16} />
                        Filters
                        <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Count */}
            {!loading && (
                <div className="mb-4">
                    <p className="text-gray-600">
                        {filteredProducts.length === products.length 
                            ? `Showing all ${filteredProducts.length} products` 
                            : `Showing ${filteredProducts.length} of ${products.length} products`
                        }
                    </p>
                </div>
            )}

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
                    <p className="text-xl text-gray-500">No products found matching your filters</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or check back later for new items!</p>
                </div>
            ) : (
                <>
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product}
                                onProductUpdated={handleProductUpdated}
                                onProductDeleted={handleProductDeleted}
                            />
                        ))}
                    </div>
                    
                    {hasMoreProducts && (
                        <div className="w-full flex justify-center py-4">
                            <button 
                                onClick={handleViewToggle}
                                className="bg-[#DB4444] text-white h-14 px-8 rounded hover:bg-[#d65e5e] cursor-pointer transition-colors"
                            >
                                {showAll ? 'Show Less' : `View All Products (${filteredProducts.length})`}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}