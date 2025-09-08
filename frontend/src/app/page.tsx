import { Hero } from "@/components/hero";
import { Category } from "@/components/category";
import { Feature } from "@/components/Feature";
import { AllProducts } from "@/components/AllProducts";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <Category />
      <Feature />
      <AllProducts />
    </div>
  );
}
