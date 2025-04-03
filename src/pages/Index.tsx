
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-indigo-900">AR Campus Tour</h1>
        <p className="text-xl text-gray-700 mb-8">
          Explore your campus in augmented reality. Discover hidden stories, important landmarks, 
          and interesting facts as you walk around.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => navigate("/tour")}
          >
            Start Tour
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            onClick={() => navigate("/about")}
          >
            About the Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
