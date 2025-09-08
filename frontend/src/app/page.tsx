import { Hero } from "@/components/hero";
import { Category } from "@/components/category";
import { Feature } from "@/components/Feature";
import { AllProducts } from "@/components/AllProducts";
import { NewArrival } from "@/components/NewArrival";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <Category />
      <Feature />
      <AllProducts />
      <NewArrival />
    </div>
  );
}
