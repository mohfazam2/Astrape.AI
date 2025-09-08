interface HeroProps {
  onCategorySelect: (category: string) => void;
}

export const Hero = ({ onCategorySelect }: HeroProps) => {
    return(
        <div className="flex justify-between py-10 gap-4 max-w-6xl mx-auto px-6">
            <div className="flex flex-col justify-between">
  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full"
        onClick={() => onCategorySelect('ELECTRONICS')}>
    ELECTRONICS
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full"
        onClick={() => onCategorySelect('CLOTHING')}>
    CLOTHING
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black
                   after:transition-all after:duration-300 
                   hover:after:w-full"
        onClick={() => onCategorySelect('BOOKS')}>
    BOOKS
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full"
        onClick={() => onCategorySelect('FURNITURE')}>
    FURNITURE
  </span>

  <span className="relative cursor-pointer text-gray-800 
                   after:content-[''] after:absolute after:left-0 after:bottom-0 
                   after:w-0 after:h-[2px] after:bg-black 
                   after:transition-all after:duration-300 
                   hover:after:w-full"
        onClick={() => onCategorySelect('GROCERIES')}>
    GROCERIES
  </span>
</div>

            <div>
                <img src="/Hero1.webp" alt="Herosection first image" draggable={false}/>
            </div>
        </div>
    )
}