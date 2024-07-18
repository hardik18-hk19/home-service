import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryList />
    </div>
  );
}
