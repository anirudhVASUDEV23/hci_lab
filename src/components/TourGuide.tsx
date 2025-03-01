import React from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TourGuideProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ 
  currentStep, 
  setCurrentStep, 
  totalSteps, 
  onClose 
}) => {
  const getTourContent = () => {
    switch (currentStep) {
      case 0:
        return {
          title: "Welcome to BudgetTracker!",
          content: "This quick tour will help you get familiar with the key features of the application. Let's get started!",
          position: "center"
        };
      case 1:
        return {
          title: "Dashboard Overview",
          content: "The dashboard gives you a complete overview of your finances. You can see your total spending, remaining budget, and which categories need attention.",
          position: "right"
        };
      case 2:
        return {
          title: "Adding Expenses",
          content: "Easily add new expenses by filling out the form. Make sure to categorize them correctly to get accurate budget insights.",
          position: "left"
        };
      case 3:
        return {
          title: "Managing Your Budget",
          content: "Set and adjust your budget limits for different categories. The system will alert you when you're approaching or exceeding your limits.",
          position: "bottom"
        };
      default:
        return {
          title: "Welcome",
          content: "Let's get started with BudgetTracker!",
          position: "center"
        };
    }
  };

  const tourContent = getTourContent();

  const getPositionClass = () => {
    switch (tourContent.position) {
      case "left":
        return "top-1/3 left-4 md:left-72";
      case "right":
        return "top-1/3 right-4";
      case "bottom":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "center":
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className={`absolute ${getPositionClass()} bg-white rounded-lg shadow-xl max-w-md w-full p-5`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-600">{tourContent.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close tour"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-700 mb-6">{tourContent.content}</p>
        
        <div className="flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft size={16} className="mr-1" />
                Previous
              </button>
            )}
          </div>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          <div>
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                Next
                <ArrowRight size={16} className="ml-1" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuide;