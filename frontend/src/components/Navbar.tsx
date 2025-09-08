"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddProductPopup } from "./AddProductPopup";
import { CartModal } from "./CartModal";
import { ShoppingCart, LogOut } from "lucide-react";

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
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
        // Redirect to home or login page
        router.push('/');
    };

    return (
        <div className="border-b-1 border-b-gray-300">
            <div className="w-full bg-[#000000] h-10 flex justify-center items-center">
                <span className="text-[#FAFAFA] text-[14px] font-normal">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
            </div>
            <div className="w-full py-6 bg-white text-black shadow">
                <div className="flex justify-between items-center max-w-6xl mx-auto px-6">

                    <div className="font-bold text-xl">SwiftCart</div>

                    <div className="flex gap-8">
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

                    <div className="flex gap-4 items-center">
                        <div 
                            className="relative group cursor-pointer"
                            onClick={() => setIsAddProductOpen(true)}
                        >
                            Add Product
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </div>

                        <div 
                            className="relative group cursor-pointer"
                            onClick={() => setIsCartOpen(true)}
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