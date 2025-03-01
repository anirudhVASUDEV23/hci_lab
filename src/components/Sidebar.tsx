import React from 'react';
import { 
  Home, 
  PieChart, 
  PlusCircle, 
  List, 
  HelpCircle,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  setShowHelp: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, setShowHelp }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'expenses', label: 'Expenses', icon: <List size={20} /> },
    { id: 'add', label: 'Add Expense', icon: <PlusCircle size={20} /> },
    { id: 'budget', label: 'Budget', icon: <PieChart size={20} /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
      <div className="p-4 flex items-center space-x-2">
        <DollarSign size={24} className="text-blue-400" />
        <h1 className="text-xl font-bold">BudgetTracker</h1>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeView === item.id
                    ? 'bg-gray-700 text-blue-400 border-l-4 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-current={activeView === item.id ? 'page' : undefined}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <HelpCircle size={20} className="mr-3" />
          Help & Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;