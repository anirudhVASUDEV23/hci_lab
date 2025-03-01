import React from 'react';
import { X, HelpCircle, Search, PlusCircle, PieChart, List } from 'lucide-react';

interface HelpSystemProps {
  setShowHelp: (show: boolean) => void;
  activeView: string;
}

const HelpSystem: React.FC<HelpSystemProps> = ({ setShowHelp, activeView }) => {
  const getHelpContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Dashboard Help</h3>
            <p className="mb-4">The dashboard provides an overview of your financial situation:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>View your total spending and remaining budget</li>
              <li>See a breakdown of spending by category</li>
              <li>Check which categories are over budget</li>
              <li>View your most recent transactions</li>
            </ul>
            <p>The color-coded progress bars show how much of each budget category you've used.</p>
          </div>
        );
      case 'expenses':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Expenses Help</h3>
            <p className="mb-4">The expenses page lets you view and manage your transaction history:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Search for specific expenses using the search box</li>
              <li>Filter expenses by category</li>
              <li>Sort expenses by date, amount, or description</li>
              <li>Delete expenses by clicking the trash icon</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-blue-800 font-medium flex items-center">
                <Search size={16} className="mr-2" />
                Tip: Use the search box to find specific expenses quickly
              </p>
            </div>
          </div>
        );
      case 'add':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Adding Expenses Help</h3>
            <p className="mb-4">To add a new expense:</p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Enter a clear description of what you purchased</li>
              <li>Enter the amount spent</li>
              <li>Select the appropriate category</li>
              <li>Choose the date of the transaction</li>
              <li>Click "Add Expense" to save</li>
            </ol>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-blue-800 font-medium flex items-center">
                <PlusCircle size={16} className="mr-2" />
                Tip: Categorize expenses accurately for better budget insights
              </p>
            </div>
          </div>
        );
      case 'budget':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Budget Management Help</h3>
            <p className="mb-4">The budget page allows you to set and adjust spending limits:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>View your current budget allocations by category</li>
              <li>See how much you've spent in each category</li>
              <li>Edit budget amounts by clicking the "Edit" button</li>
              <li>Categories highlighted in red are over budget</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-blue-800 font-medium flex items-center">
                <PieChart size={16} className="mr-2" />
                Tip: Review and adjust your budgets monthly based on your spending patterns
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">General Help</h3>
            <p>Welcome to BudgetTracker! Use the navigation menu to access different features.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold flex items-center">
            <HelpCircle size={20} className="mr-2 text-blue-500" />
            Help & Support
          </h2>
          <button
            onClick={() => setShowHelp(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close help"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          {getHelpContent()}
          
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">How do I delete an expense?</h4>
                <p className="text-gray-600">Go to the Expenses page and click the trash icon next to the expense you want to delete.</p>
              </div>
              
              <div>
                <h4 className="font-medium">Can I edit an expense after adding it?</h4>
                <p className="text-gray-600">Currently, you cannot edit expenses. You'll need to delete the incorrect expense and add a new one.</p>
              </div>
              
              <div>
                <h4 className="font-medium">How do I change my budget?</h4>
                <p className="text-gray-600">Go to the Budget page and click "Edit" next to the category you want to change.</p>
              </div>
              
              <div>
                <h4 className="font-medium">What does "over budget" mean?</h4>
                <p className="text-gray-600">It means you've spent more in a category than the budget you set. These will be highlighted in red.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowHelp(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Close Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSystem;