import { Hero } from "../components/hero";
import { Category } from "../components/category";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <Category />
    </div>
  );
}
