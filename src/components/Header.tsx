import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  PieChart, 
  PlusCircle, 
  List, 
  HelpCircle,
  DollarSign,
  Info
} from 'lucide-react';

interface HeaderProps {
  activeView: string;
  setShowHelp: (show: boolean) => void;
  setShowTour: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setShowHelp, setShowTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const getTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'expenses':
        return 'Expense History';
      case 'add':
        return 'Add Expense';
      case 'budget':
        return 'Budget Management';
      default:
        return 'BudgetTracker';
    }
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'expenses', label: 'Expenses', icon: <List size={20} /> },
    { id: 'add', label: 'Add Expense', icon: <PlusCircle size={20} /> },
    { id: 'budget', label: 'Budget', icon: <PieChart size={20} /> },
  ];

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="ml-2 text-lg font-semibold text-gray-800">{getTitle()}</h1>
        </div>
        
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-800">{getTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowTour(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Show tour guide"
          >
            <Info size={20} />
          </button>
          <button
            onClick={() => setShowHelp(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
            aria-label="Show help"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-100 py-2">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    activeView === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;