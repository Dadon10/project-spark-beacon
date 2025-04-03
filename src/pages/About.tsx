
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Github, Lightbulb, BookOpen, Code } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back Home
          </Button>
          <h1 className="text-xl font-bold text-center">About the Project</h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">Augmented Reality Campus Tour</h2>
          <p className="text-gray-700 mb-6">
            This final year project combines augmented reality technology with educational content to create an 
            immersive and interactive tour of the university campus. As users navigate the physical campus, 
            they can use their smartphones to discover information, historical facts, and interactive elements
            at key locations.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-indigo-800">Project Goals</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Enhance the campus orientation experience for new students and visitors</li>
            <li>Preserve and share the historical and cultural significance of campus landmarks</li>
            <li>Demonstrate the application of AR technology in educational settings</li>
            <li>Create an accessible and user-friendly digital experience</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-indigo-800">Technologies Used</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>React for frontend user interface</li>
            <li>WebXR API for browser-based augmented reality</li>
            <li>Geolocation APIs for location-based content delivery</li>
            <li>Web camera access for AR marker recognition</li>
            <li>Responsive design for cross-device compatibility</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-indigo-800">Future Enhancements</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>3D modeling of historical buildings and landmarks</li>
            <li>Audio narration for accessibility</li>
            <li>User-contributed content and memories</li>
            <li>Gamification elements like badges and challenges</li>
            <li>Integration with university events calendar</li>
          </ul>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-3 border-indigo-200 hover:bg-indigo-50"
          >
            <Github size={24} />
            <span>View Source Code</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-3 border-indigo-200 hover:bg-indigo-50"
          >
            <BookOpen size={24} />
            <span>Documentation</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-3 border-indigo-200 hover:bg-indigo-50"
          >
            <Lightbulb size={24} />
            <span>Provide Feedback</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default About;
