"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddProductPopup } from "./AddProductPopup";
import { CartModal } from "./CartModal";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: string;
}

export const Navbar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkSignInStatus = () => {
            const signedIn = localStorage.getItem("signedin");
            setIsSignedIn(signedIn === "true");
        };

        // Check initially
        checkSignInStatus();

        // Listen for storage changes (when user logs in from another tab)
        const handleStorageChange = () => {
            checkSignInStatus();
        };

        // Listen for custom login event
        const handleLoginEvent = () => {
            checkSignInStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('userLoggedIn', handleLoginEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLoggedIn', handleLoginEvent);
        };
    }, []);

    const handleProductAdded = (newProduct: Product) => {
        console.log('New product added:', newProduct);
    };

    const handleCategoriesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        
        if (pathname === '/') {
            window.dispatchEvent(new CustomEvent('scrollToCategories'));
        } else {
            router.push('/');
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('scrollToCategories'));
            }, 100);
        }
    };

    const handleProductsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        
        if (pathname === '/') {
            window.dispatchEvent(new CustomEvent('scrollToProducts'));
        } else {
            router.push('/');
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('scrollToProducts'));
            }, 100);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("signedin");
        setIsSignedIn(false);
        setShowLogoutPopup(false);
        setIsMobileMenuOpen(false);
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
        // Redirect to home or login page
        router.push('/');
    };

    const handleAddProductClick = () => {
        setIsAddProductOpen(true);
        setIsMobileMenuOpen(false);
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="border-b-1 border-b-gray-300">
            <div className="w-full bg-[#000000] h-10 flex justify-center items-center px-4">
                <span className="text-[#FAFAFA] text-[12px] sm:text-[14px] font-normal text-center">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
            </div>
            <div className="w-full py-4 sm:py-6 bg-white text-black shadow">
                <div className="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6">

                    <div className="font-bold text-lg sm:text-xl">SwiftCart</div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex gap-8">
                        <button
                            onClick={handleCategoriesClick}
                            className="relative group bg-transparent border-none cursor-pointer text-black text-base"
                        >
                            Browse By Categories
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        
                        <button
                            onClick={handleProductsClick}
                            className="relative group bg-transparent border-none cursor-pointer text-black text-base"
                        >
                            All Products
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex gap-4 items-center">
                        <button 
  className="relative group px-6 py-2 border-2 border-black bg-transparent text-black font-medium rounded-md overflow-hidden transition-all duration-300 hover:text-white cursor-pointer"
  onClick={handleAddProductClick}
>
  <span className="relative z-10">Add Product</span>
  
  
  <span className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
  
  
  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
  
</button>

                        <div 
                            className="relative group cursor-pointer"
                            onClick={handleCartClick}
                        >
                            <ShoppingCart />
                            <div className="absolute inset-0 rounded-full border-2 border-black scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                        </div>

                        {isSignedIn ? (
                            <div 
                                className="relative"
                                onMouseEnter={() => setShowLogoutPopup(true)}
                                onMouseLeave={() => setShowLogoutPopup(false)}
                            >
                                <div className="relative group cursor-pointer">
                                    <img
                                        src="/user.webp"
                                        alt="user profile"
                                        draggable={false}
                                        className="w-6 h-6 transition-all duration-300 group-hover:scale-110 object-cover"
                                    />
                                    <div className="absolute inset-0 rounded-full border-2 border-black scale-0 group-hover:scale-170 transition-transform duration-300"></div>
                                </div>
                                
                                {/* Logout Popup */}
                                <div className={`absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 px-3 min-w-[120px] transition-all duration-200 z-50 ${
                                    showLogoutPopup ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                }`}>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/signup" className="relative group">
                                SignUp/Login
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Right Side */}
                    <div className="flex lg:hidden gap-3 items-center">
                        <div 
                            className="relative group cursor-pointer"
                            onClick={handleCartClick}
                        >
                            <ShoppingCart size={20} />
                        </div>

                        {isSignedIn ? (
                            <div className="relative group cursor-pointer">
                                <img
                                    src="/user.webp"
                                    alt="user profile"
                                    draggable={false}
                                    className="w-5 h-5 object-cover"
                                />
                            </div>
                        ) : null}

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-black focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={handleCategoriesClick}
                                className="text-left py-2 text-black hover:text-gray-600 transition-colors"
                            >
                                Browse By Categories
                            </button>
                            
                            <button
                                onClick={handleProductsClick}
                                className="text-left py-2 text-black hover:text-gray-600 transition-colors"
                            >
                                All Products
                            </button>

                            <button
                                onClick={handleAddProductClick}
                                className="text-left py-2 text-black hover:text-gray-600 transition-colors"
                            >
                                Add Product
                            </button>

                            {isSignedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            ) : (
                                <Link 
                                    href="/signup" 
                                    className="text-left py-2 text-black hover:text-gray-600 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    SignUp/Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AddProductPopup
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onProductAdded={handleProductAdded}
            />

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
};