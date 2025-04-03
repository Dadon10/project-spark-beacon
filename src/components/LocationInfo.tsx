
import { Button } from "@/components/ui/button";
import { X, ChevronRight, MessageSquare } from "lucide-react";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Location {
  id: number;
  name: string;
  description: string;
  image: string;
  facts: string[];
}

interface LocationInfoProps {
  location: Location;
  onClose: () => void;
}

const LocationInfo = ({ location, onClose }: LocationInfoProps) => {
  const [activeTab, setActiveTab] = useState<'info' | 'facts'>('info');
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={location.image} 
            alt={location.name}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{location.name}</h3>
        
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`pb-2 px-4 font-medium ${activeTab === 'info' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            About
          </button>
          <button
            className={`pb-2 px-4 font-medium ${activeTab === 'facts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('facts')}
          >
            Facts
          </button>
        </div>
        
        {/* Tab content */}
        <div className="mb-4">
          {activeTab === 'info' ? (
            <p className="text-gray-700">{location.description}</p>
          ) : (
            <ul className="space-y-2">
              {location.facts.map((fact, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight size={18} className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{fact}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between pt-2">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare size={16} /> Leave Comment
          </Button>
          <Button className="bg-indigo-600">Take AR Photo</Button>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
