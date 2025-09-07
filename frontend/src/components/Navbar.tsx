import Link from "next/link";

export const Navbar = () => {
    return (
        <div>
            <div className="w-full bg-[#000000] h-10 flex justify-center items-center">
                <span className="text-[#FAFAFA] text-[14px] font-normal">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
            </div>
            <div className="w-full py-8 bg-white text-black shadow">
                <div className="flex justify-between items-center max-w-6xl mx-auto px-6">

                    <div className="font-bold text-xl">SwiftCard</div>


                    <div className="flex gap-8">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/products", label: "Products" },
                            { href: "/cart", label: "Cart" },
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


                    <div>
                        <Link href="/login" className="relative group">
                            SignUp/Login
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
