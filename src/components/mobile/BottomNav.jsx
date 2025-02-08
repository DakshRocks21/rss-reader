// Made by Daksh

import { FaHome, FaCog, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-secondary-container shadow-md flex justify-around py-3 items-center">
      <button 
        onClick={() => router.push("/")} 
        className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
      >
        <FaHome className="text-3xl text-on-secondary-container" />
      </button>

      <button 
        onClick={() => router.push("/interests")} 
        className="bg-secondary-container absolute top-[-15] p-3 rounded-full shadow-lg transform scale-125 hover:scale-150 transition-transform duration-200"
        aria-label="Add"
      >
        <FaPlus className="text-3xl text-on-secondary-container" />
      </button>

      <button 
        onClick={() => router.push("/settings")} 
        className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
      >
        <FaCog className="text-3xl text-on-secondary-container" />
      </button>
    </nav>
  );
}
