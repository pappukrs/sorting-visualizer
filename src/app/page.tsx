import Image from "next/image";
import SortingVisualizer from "../components/index";

export default function Home() {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen py-2">       
     <SortingVisualizer />
    </div>
  );
}
