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
            </div>

        </div>
    )
}




const Product = () => {
    return (
        <div>

        </div>
    )
}