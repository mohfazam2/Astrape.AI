import { Hero } from "../components/hero";
import { Category } from "../components/category";
import Image from "next/image";
import { Feature } from "@/components/Feature";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <Category />
      <Feature />
    </div>
  );
}
