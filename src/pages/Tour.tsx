
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ARMarker from "@/components/ARMarker";
import LocationInfo from "@/components/LocationInfo";
import { ArrowLeft, Info, MapPin, Camera } from "lucide-react";
import { toast } from "sonner";

// Sample tour locations data
const tourLocations = [
  {
    id: 1,
    name: "University Library",
    description: "The main academic hub housing over 1 million resources and state-of-the-art study spaces.",
    coordinates: { lat: 51.5074, lng: -0.1278 }, // Replace with actual coordinates
    image: "https://source.unsplash.com/photo-1472396961693-142e6e269027",
    facts: [
      "Built in 1967 and renovated in 2018",
      "Houses rare book collections dating back to the 16th century",
      "Open 24/7 during exam periods"
    ]
  },
  {
    id: 2,
    name: "Science Building",
    description: "Home to cutting-edge research labs and interactive learning spaces for STEM subjects.",
    coordinates: { lat: 51.5075, lng: -0.1279 }, // Replace with actual coordinates
    image: "https://source.unsplash.com/photo-1492321936769-b49830bc1d1e",
    facts: [
      "Features a rooftop observatory for astronomy studies",
      "Contains 42 research laboratories",
      "Hosts the annual Science Fair each spring"
    ]
  },
  {
    id: 3,
    name: "Student Union",
    description: "The heart of student life with cafes, clubs, and event spaces for the campus community.",
    coordinates: { lat: 51.5076, lng: -0.1280 }, // Replace with actual coordinates
    image: "https://source.unsplash.com/photo-1433086966358-54859d0ed716",
    facts: [
      "Established in 1952 as a student-led organization",
      "Houses over 50 student clubs and societies",
      "The cafe serves over 2,000 meals daily"
    ]
  }
];

const Tour = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [arMode, setArMode] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Check for camera permissions when AR mode is toggled on
    if (arMode) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          setPermissionGranted(true);
          toast.success("Camera access granted. AR mode activated!");
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setArMode(false);
          toast.error("Camera access denied. AR mode requires camera permissions.");
        });
    }
  }, [arMode]);

  const toggleARMode = () => {
    setArMode(!arMode);
    if (!arMode) {
      toast.info("Initializing AR mode...");
    }
  };

  const handleSelectLocation = (id: number) => {
    setSelectedLocation(id);
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
  };

  const currentLocation = tourLocations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back Home
          </Button>
          <h1 className="text-xl font-bold text-center">Campus AR Tour</h1>
          <Button 
            variant={arMode ? "default" : "outline"}
            onClick={toggleARMode}
            className={`flex items-center gap-2 ${arMode ? "bg-indigo-600" : ""}`}
          >
            <Camera size={18} /> {arMode ? "Exit AR" : "Enter AR"}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        {arMode ? (
          <div className="relative">
            {/* AR View */}
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden relative">
              {permissionGranted ? (
                <div className="w-full h-full">
                  <video 
                    id="arVideo" 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                  ></video>
                  
                  {/* AR Markers */}
                  {tourLocations.map(location => (
                    <ARMarker 
                      key={location.id}
                      id={location.id}
                      name={location.name}
                      position={{ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }}
                      onSelect={() => handleSelectLocation(location.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-white text-center p-8">
                  <p>Camera access is required for AR mode.</p>
                  <Button 
                    onClick={toggleARMode} 
                    className="mt-4"
                  >
                    Return to Map View
                  </Button>
                </div>
              )}
            </div>

            {/* Selected Location Info in AR Mode */}
            {selectedLocation && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <LocationInfo 
                  location={currentLocation!}
                  onClose={clearSelectedLocation}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Map View */}
            <h2 className="text-2xl font-bold mb-6">Tour Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourLocations.map(location => (
                <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${location.image})` }}
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                    <p className="text-gray-600 mb-4">{location.description}</p>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleSelectLocation(location.id)}
                      >
                        <Info size={16} /> Details
                      </Button>
                      <Button 
                        size="sm"
                        className="flex items-center gap-2 bg-indigo-600"
                        onClick={() => {
                          setSelectedLocation(location.id);
                          setArMode(true);
                        }}
                      >
                        <MapPin size={16} /> Find in AR
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Location Info in Map Mode */}
            {selectedLocation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
                  <LocationInfo 
                    location={currentLocation!}
                    onClose={clearSelectedLocation}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Tour;
