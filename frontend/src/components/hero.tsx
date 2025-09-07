export const Hero = () => {
    return(
        <div className="flex justify-between py-10 gap-4 max-w-6xl mx-auto px-6">
            <div className="flex flex-col justify-between">
  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full">
    ELECTRONICS
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full">
    CLOTHING
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black
                   after:transition-all after:duration-300 
                   hover:after:w-full">
    BOOKS
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full">
    FURNITURE
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full">
    GROCERIES
  </span>
</div>

            <div>
                <img src="/Hero1.webp" alt="Herosection first image" draggable={false}/>
            </div>
        </div>
    )
}