import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  PieChart, 
  Calendar, 
  DollarSign, 
  HelpCircle, 
  Home, 
  Settings, 
  BarChart3, 
  Tag,
  X,
  Info
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetOverview from './components/BudgetOverview';
import HelpSystem from './components/HelpSystem';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TourGuide from './components/TourGuide';

// Sample data
const initialExpenses = [
  { id: 1, description: 'Groceries', amount: 120, category: 'Food', date: '2025-04-01' },
  { id: 2, description: 'Electricity Bill', amount: 85, category: 'Utilities', date: '2025-04-03' },
  { id: 3, description: 'Movie Tickets', amount: 30, category: 'Entertainment', date: '2025-04-05' },
  { id: 4, description: 'Gas', amount: 45, category: 'Transportation', date: '2025-04-08' },
];

const initialBudgets = {
  Food: 300,
  Utilities: 200,
  Entertainment: 100,
  Transportation: 150,
  Other: 100
};

const categories = ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Other'];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [activeView, setActiveView] = useState('dashboard');
  const [showHelp, setShowHelp] = useState(false);
  const [showTour, setShowTour] = useState(true);
  const [currentTourStep, setCurrentTourStep] = useState(0);

  // Check if it's the user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      setShowTour(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateBudget = (category, amount) => {
    setBudgets({
      ...budgets,
      [category]: amount
    });
  };

  const getTotalExpensesByCategory = (category) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalBudget = () => {
    return Object.values(budgets).reduce((total, budget) => total + budget, 0);
  };

  const getContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            expenses={expenses} 
            budgets={budgets} 
            getTotalExpensesByCategory={getTotalExpensesByCategory}
            getTotalExpenses={getTotalExpenses}
            getTotalBudget={getTotalBudget}
          />
        );
      case 'expenses':
        return (
          <ExpenseList 
            expenses={expenses} 
            deleteExpense={deleteExpense} 
            categories={categories}
          />
        );
      case 'add':
        return (
          <ExpenseForm 
            addExpense={addExpense} 
            categories={categories} 
          />
        );
      case 'budget':
        return (
          <BudgetOverview 
            budgets={budgets} 
            updateBudget={updateBudget} 
            categories={categories}
            getTotalExpensesByCategory={getTotalExpensesByCategory}
          />
        );
      default:
        return <Dashboard expenses={expenses} budgets={budgets} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        setShowHelp={setShowHelp}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeView={activeView} 
          setShowHelp={setShowHelp}
          setShowTour={setShowTour}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {getContent()}
        </main>
      </div>

      {/* Help System Modal */}
      {showHelp && (
        <HelpSystem setShowHelp={setShowHelp} activeView={activeView} />
      )}

      {/* Tour Guide */}
      {showTour && (
        <TourGuide 
          currentStep={currentTourStep} 
          setCurrentStep={setCurrentTourStep} 
          totalSteps={4} 
          onClose={() => setShowTour(false)}
        />
      )}
    </div>
  );
}

export default App;