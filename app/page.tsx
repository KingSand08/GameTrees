import Image from "next/image";
import Link from "next/link";
import GameTable from "@/app/components/GameTable"
import HighlightGameCards from "./components/Hero";
import ScrollSection from "./components/ScrollSection";


const trending = [
  { id: 1, title: "Red Dead Redemption 2", price: "$19.79", discount: "-67%" },
  { id: 2, title: "Baldur's Gate 3", price: "$59.99" },
  { id: 3, title: "Call of Duty: Black Ops 6", price: "$69.99" },
  { id: 4, title: "Elden Ring", price: "$43.99", discount: "-27%" },
  { id: 5, title: "Cyberpunk 2077", price: "$29.99", discount: "-50%" },
  { id: 6, title: "Dragon Age: The Veilguard", price: "$59.99" },
  { id: 7, title: "Monster Hunter Wilds", price: "$57.39", discount: "-18%" },
  { id: 8, title: "Resident Evil 4 (2023)", price: "$14.44", discount: "-64%" },
];
export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 text-gray-100 space-y-12">
      <HighlightGameCards /> 
      <ScrollSection />
      <GameTable/>
    </div>
  );
}
