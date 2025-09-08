interface HeroProps {
  onCategorySelect: (category: string) => void;
}

export const Hero = ({ onCategorySelect }: HeroProps) => {
    return(
        <div className="flex flex-col lg:flex-row justify-between py-6 sm:py-8 lg:py-10 gap-4 sm:gap-6 lg:gap-4 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-row flex-wrap gap-2 sm:gap-3 lg:flex-col lg:justify-between lg:gap-0">
  <span className="relative cursor-pointer text-gray-800 text-sm sm:text-base lg:text-base
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full py-1 lg:py-0"
        onClick={() => onCategorySelect('ELECTRONICS')}>
    ELECTRONICS
  </span>

  <span className="relative cursor-pointer text-gray-800 text-sm sm:text-base lg:text-base
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full py-1 lg:py-0"
        onClick={() => onCategorySelect('CLOTHING')}>
    CLOTHING
  </span>

  <span className="relative cursor-pointer text-gray-800 text-sm sm:text-base lg:text-base
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black
                   after:transition-all after:duration-300 
                   hover:after:w-full py-1 lg:py-0"
        onClick={() => onCategorySelect('BOOKS')}>
    BOOKS
  </span>

  <span className="relative cursor-pointer text-gray-800 text-sm sm:text-base lg:text-base
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full py-1 lg:py-0"
        onClick={() => onCategorySelect('FURNITURE')}>
    FURNITURE
  </span>

  <span className="relative cursor-pointer text-gray-800 text-sm sm:text-base lg:text-base
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full py-1 lg:py-0"
        onClick={() => onCategorySelect('GROCERIES')}>
    GROCERIES
  </span>
</div>

            <div className="flex justify-center lg:justify-end">
                <img src="/Hero1.webp" alt="Herosection first image" draggable={false} className="max-w-full h-auto w-full sm:w-auto max-h-64 sm:max-h-80 lg:max-h-none object-contain lg:object-cover"/>
            </div>
        </div>
    )
}