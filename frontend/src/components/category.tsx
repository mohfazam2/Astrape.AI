import { TabletSmartphone, Shirt, Book, Lamp, Apple  } from "lucide-react";

export const Category = () => {
    return (
        <div className="max-w-6xl mx-auto px-6">
        
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
    
        </div>
    )
}