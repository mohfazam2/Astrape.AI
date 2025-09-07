import Image from "next/image";

export default function Signup() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-6">
            <div className="flex bg-white rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full">
               
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

                
                <div className="w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                                Create Account
                            </h1>
                            <p className="text-gray-500 text-lg">Join us and start your journey today</p>
                        </div>

                        <form className="space-y-8">
                            <div className="animated-input">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-[#DB4444] px-1 py-4 text-lg text-gray-800 bg-transparent placeholder-gray-400 transition-colors duration-300"
                                />
                            </div>

                            <div className="animated-input">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-[#DB4444] px-1 py-4 text-lg text-gray-800 bg-transparent placeholder-gray-400 transition-colors duration-300"
                                />
                            </div>

                            <div className="animated-input">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border-0 border-b-2 border-gray-200 focus:outline-none focus:border-[#DB4444] px-1 py-4 text-lg text-gray-800 bg-transparent placeholder-gray-400 transition-colors duration-300"
                                />
                            </div>

                            <div className="pt-3">
                                <div className="bg-gradient-to-r from-[#DB4444] to-[#FF4444] rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all duration-300">
                                    <button className="flex justify-center items-center w-full h-10 text-white font-semibold text-sm relative z-10 transform transition-transform duration-200 active:scale-95">
                                        <span className="relative">Create Account</span>
                                    </button>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                </div>
                            </div>

                            <div className="text-center pt-3">
                                <p className="text-gray-500 text-xs">
                                    Already have an account?
                                    <span className="relative text-[#DB4444] font-medium cursor-pointer ml-1 
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FF4444] 
    after:transition-all after:duration-300 hover:after:w-full hover:text-[#FF4444] pb-1">
                                        Sign in
                                    </span>

                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}