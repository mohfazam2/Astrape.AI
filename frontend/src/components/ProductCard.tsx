interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
 
  const discountPercent = Math.floor(Math.random() * 20) + 5;
  const originalPrice = product.price / (1 - discountPercent / 100);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    console.log('Added to cart:', product);
    
  };
  
  return (
    <div className="min-h-[400px] max-w-[270px] border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer">
      <div className="min-h-[250px] flex justify-center items-center p-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-[200px] object-contain"
          onError={(e) => {
            
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x200?text=No+Image";
          }}
        />
      </div>

      <div className="flex flex-col px-4 pb-4 gap-2">
        <span className="font-semibold text-lg text-gray-900 truncate">{product.name}</span>

        <div className="flex items-center gap-3">
          <span className="text-[#DB4444] font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-sm">${originalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-1 text-yellow-400 mb-3">
          {"★".repeat(Math.floor(Math.random() * 3 + 3))}
          {"☆".repeat(2)}
          <span className="text-gray-400 text-sm ml-2">
            ({Math.floor(Math.random() * 100 + 10)})
          </span>
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#DB4444] text-white py-2 px-4 rounded-lg hover:bg-[#c93939] transition-colors duration-200 font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};