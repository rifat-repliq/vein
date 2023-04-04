import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/section/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} `}>
      <Hero />
    </main>
  );
}
