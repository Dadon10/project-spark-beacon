
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ARMarkerProps {
  id: number;
  name: string;
  position: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
  onSelect: () => void;
}

const ARMarker = ({ id, name, position, onSelect }: ARMarkerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Simulate marker detection with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Add pulsing effect after marker appears
      const pulseTimer = setTimeout(() => {
        setIsPulsing(true);
      }, 500);
      
      return () => clearTimeout(pulseTimer);
    }, Math.random() * 1500 + 500); // Random delay for natural appearance
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%` 
      }}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center cursor-pointer">
        {/* Pulsing background */}
        <div 
          className={cn(
            "absolute w-12 h-12 bg-indigo-500 rounded-full opacity-30",
            isPulsing && "animate-ping"
          )}
        ></div>
        
        {/* Pin */}
        <div className="relative bg-indigo-600 text-white p-2 rounded-full z-10">
          <MapPin size={24} />
        </div>
        
        {/* Label */}
        <div className="mt-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
};

export default ARMarker;
