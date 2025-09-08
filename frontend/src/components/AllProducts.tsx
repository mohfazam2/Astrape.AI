export const AllProducts = () => {
    return(
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4">
          <div className="bg-[#DB4444] w-5 h-10 rounded" />
          <span className="text-[#DB4444] text-[18px]">Categories</span>
        </div>

        <div className="flex justify-between">
          <h3 className="text-[48px] capitalize">Our Products</h3>
          <button className="bg-[#DB4444] text-white h-14 w-38 rounded hover:bg-[#d65e5e] cursor-pointer">
            View All
          </button>
        </div>
        </div>
    )
}