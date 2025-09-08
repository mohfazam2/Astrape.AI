"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignin = async (e: any) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        
        const user = {
            "email": email,
            "password": password 
        }
        
        try {
            // Clear any existing authentication data first
            localStorage.removeItem("JWT");
            localStorage.removeItem("signedin");
            
            // Dispatch logout event to clear any cached data
            window.dispatchEvent(new CustomEvent('userLoggedOut'));
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, user);
            console.log(response.data); 
            
            // Set new authentication data
            localStorage.setItem("JWT", (response.data as any).token);
            localStorage.setItem("signedin", "true");
            
            // Dispatch login event for components to update
            window.dispatchEvent(new CustomEvent('userLoggedIn'));
            
            toast.success("Signin successful! 🎉");
            toast.success("Redirecting to Home Page ↗️");
            
            // Small delay to show toast messages
            setTimeout(() => {
                router.push("/");
            }, 1000);
            
        } catch (err: any) {
            console.error("Signin error:", err);
            
            // More specific error messages
            if (err.response?.status === 401) {
                toast.error("Invalid email or password");
            } else if (err.response?.status >= 500) {
                toast.error("Server error. Please try again later");
            } else {
                toast.error("Something went wrong. Please try again");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-6">
            <Toaster position="top-right" />
            <div className="flex bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">

                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                                Sign In to SwiftCart
                            </h1>
                            <p className="text-gray-500 text-lg">Enter your credentials to continue your shopping</p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSignin}>

                            <div className="animated-input">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    placeholder="Email Address"
                                    disabled={loading}
                                    className="w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-[#DB4444] px-1 py-4 text-lg text-gray-800 bg-transparent placeholder-gray-400 transition-colors duration-300 disabled:opacity-50"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                            </div>

                            <div className="animated-input relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    disabled={loading}
                                    className="w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-[#DB4444] px-1 py-4 pr-12 text-lg text-gray-800 bg-transparent placeholder-gray-400 transition-colors duration-300 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    disabled={loading}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#DB4444] transition-colors duration-200 focus:outline-none disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                            </div>

                            <div className="pt-3">
                                <div className="bg-gradient-to-r from-[#DB4444] to-[#FF4444] rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all duration-300">
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="flex justify-center items-center w-full h-10 text-white font-semibold text-sm relative z-10 transform transition-transform duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                                <span className="relative">Signing in...</span>
                                            </>
                                        ) : (
                                            <span className="relative">Signin</span>
                                        )}
                                    </button>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                </div>
                            </div>

                            <div className="text-center pt-3">
                                <p className="text-gray-500 text-xs">
                                    Don't have an account?
                                    <span className="relative text-[#DB4444] font-medium cursor-pointer ml-1 
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FF4444] 
    after:transition-all after:duration-300 hover:after:w-full hover:text-[#FF4444] pb-1">
                                        <Link href="/signup" >Sign Up</Link>
                                    </span>

                                </p>
                            </div>
                        </form>
                    </div>
                </div>
               
                <div className="w-1/2 relative bg-gradient-to-br from-[#CBE4E8] to-[#A8D5E0] flex justify-center items-center p-8">
                    <div className="relative w-[500px] h-[550px] rounded-2xl overflow-hidden shadow-lg  transition-transform duration-700">
                        <Image
                            src="/auth-image.webp"
                            alt="auth image"
                            fill
                            className="object-cover"
                            draggable={false}
                        />
                    </div>
                    
                    <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                
                
            </div>
        </div>
    );
}