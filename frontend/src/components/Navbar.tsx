"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const signedIn = localStorage.getItem("signedin");
        setIsSignedIn(signedIn === "true");
    }, []);

    return (
        <div className="border-b-1 border-b-gray-300">
            <div className="w-full bg-[#000000] h-10 flex justify-center items-center">
                <span className="text-[#FAFAFA] text-[14px] font-normal">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
            </div>
            <div className="w-full py-8 bg-white text-black shadow">
                <div className="flex justify-between items-center max-w-6xl mx-auto px-6">

                    <div className="font-bold text-xl">SwiftCart</div>


                    <div className="flex gap-8">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/products", label: "Products" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group"
                            >
                                {link.label}

                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>


                    <div className="flex gap-4 items-center">
                        <div className="relative group">
                            Cart
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </div>

                        {isSignedIn ? (
                            <div className="relative group">
                                <img
                                    src="/user.webp"
                                    alt="user profile"
                                    draggable={false}
                                    className="w-6 transition-all duration-300 group-hover:scale-110 object-cover"
                                />
                                <div className="absolute inset-0 rounded-full border-2 border-black scale-0 group-hover:scale-170 hover:cursor-pointer transition-transform duration-300"></div>
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
        </div >
    );
};
