import Image from "next/image";

export default function Signup() {
    return (
        <div className="w-full min-h-screen bg-white flex justify-between items-center py-12 px-48">
            <div className="flex h-[600px] w-[600px] bg-[#CBE4E8] rounded-xl overflow-hidden shadow-lg justify-center">
                {/* Left image */}
                <div className="w-[600px] h-[600px] flex justify-center items-center">
                    <Image
                        src="/auth-image.webp"
                        alt="auth image"
                        width={900}
                        height={900}
                        className="object-cover rounded-lg"
                    />
                </div>


            </div>
            <div className="min-w-[370px] border-4 border-amber-800 min-h-[530px] p-6">
                <div>
                    <div className="flex flex-col justify-between h-[78px]">
                        <h3 className="text-[#000000] text-[30px]">Create an account</h3>
                        <span className="text-[#000000] text-[14px]">Enter your details below</span>
                    </div>

                    <div>
                    <input type="text" placeholder="Name" />
                    </div>

                </div>
            </div>
        </div>
    );
}