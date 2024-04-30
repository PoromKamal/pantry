import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/Navigation";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <main className={`w-full h-full ${inter.className}`}>
      <Navbar/>
    </main>
  );
}
