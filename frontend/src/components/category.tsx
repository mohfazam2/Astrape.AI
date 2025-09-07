import { TabletSmartphone, Shirt, Book, Lamp, Apple, ShoppingCart, Heart } from "lucide-react";

export const Category = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6 h-full">
            <div className="w-full h-[1px] bg-gray-300" />
            <div className="flex items-center gap-4">
                <div className="bg-[#DB4444] w-5 h-10 rounded" />
                <span className="text-[#DB4444] text-[18px]">Cetegories</span>
            </div>
            <div>
                <h3 className="text-[48px]">Browse By Category</h3>
            </div>
            <div className="flex w-full justify-between">
                <div className="border-1 border-gray-300 h-36 w-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer">
                    <TabletSmartphone size={38} />
                    <span className="py-2"> ELECTRONICS</span>
                </div>

                <div className="border-1 border-gray-300 h-36 w-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer">
                    <Shirt size={38} />
                    <span className="py-2"> CLOTHING</span>
                </div>

                <div className="border-1 border-gray-300 h-36 w-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer">
                    <Book size={38} />
                    <span className="py-2"> Books</span>
                </div>

                <div className="border-1 border-gray-300 h-36 w-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer">
                    <Lamp size={38} />
                    <span className="py-2"> FURNITURE</span>
                </div>

                <div className="border-1 border-gray-300 h-36 w-36 flex flex-col justify-center items-center rounded-md hover:bg-[#DB4444] hover:cursor-pointer">
                    <Apple size={38} />
                    <span className="py-2"> GROCERIES</span>
                </div>
            </div>

            <div className="w-full h-[1px] bg-gray-300" />
            {/* product by each category */}
            <div>
                <div className="flex items-center gap-4">
                    <div className="bg-[#DB4444] w-5 h-10 rounded" />
                    <span className="text-[#DB4444] text-[18px]">Cetegories</span>
                </div>

                <div className="flex justify-between">
                    <h3 className="text-[48px]">Electronics</h3>
                    <button className="bg-[#DB4444] text-white h-14 w-38 rounded hover:bg-[#d65e5e] cursor-pointer">View All</button>
                </div>

                <div className="py-4">
                    <Product />
                </div>
            </div>

        </div>
    )
}




const Product = () => {
    return (
        <div className="min-h-[350px] max-w-[270px] border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer">
            <div className="min-h-[250px] flex justify-center items-center p-4">
                <img 
                    src="https://inventstore.in/wp-content/uploads/2023/04/iPhone_13_Blue.webp" 
                    alt="Product Image" 
                    className="h-[200px] object-contain"
                />
            </div>

            <div className="flex flex-col px-4 pb-4 gap-2">
                <span className="font-semibold text-lg text-gray-900 truncate">iPhone 13</span>

                <div className="flex items-center gap-3">
                    <span className="text-[#DB4444] font-bold text-lg">₹80,000</span>
                    <span className="text-gray-400 line-through text-sm">₹90,000</span>
                </div>

                <div className="flex gap-1 text-yellow-400">
                    ★★★★☆
                </div>
            </div>
        </div>
    );
};
