import React from 'react';
import { PieChart, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface DashboardProps {
  expenses: Expense[];
  budgets: Record<string, number>;
  getTotalExpensesByCategory: (category: string) => number;
  getTotalExpenses: () => number;
  getTotalBudget: () => number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  expenses, 
  budgets, 
  getTotalExpensesByCategory,
  getTotalExpenses,
  getTotalBudget
}) => {
  const totalExpenses = getTotalExpenses();
  const totalBudget = getTotalBudget();
  const remainingBudget = totalBudget - totalExpenses;
  const percentSpent = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  // Get recent expenses (last 5)
  const recentExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  // Find categories that are over budget
  const overBudgetCategories = Object.keys(budgets).filter(
    category => getTotalExpensesByCategory(category) > budgets[category]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold">${totalExpenses}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp size={20} className="text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Remaining Budget</p>
              <p className="text-2xl font-bold">${remainingBudget}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 size={20} className="text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Budget Used</p>
              <p className="text-2xl font-bold">{percentSpent.toFixed(1)}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <PieChart size={20} className="text-purple-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Budget Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
        <div className="space-y-4">
          {Object.keys(budgets).map(category => {
            const spent = getTotalExpensesByCategory(category);
            const budget = budgets[category];
            const percentage = budget > 0 ? (spent / budget) * 100 : 0;
            const isOverBudget = spent > budget;
            
            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-sm text-gray-500">${spent} / ${budget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          {recentExpenses.length > 0 ? (
            <div className="space-y-3">
              {recentExpenses.map(expense => (
                <div key={expense.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.date} • {expense.category}</p>
                  </div>
                  <p className="font-semibold">${expense.amount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent transactions</p>
          )}
        </div>
        
        {/* Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Alerts</h2>
          {overBudgetCategories.length > 0 ? (
            <div className="space-y-3">
              {overBudgetCategories.map(category => (
                <div key={category} className="flex items-start gap-3 p-3 bg-red-50 text-red-700 rounded-lg">
                  <AlertTriangle size={20} />
                  <div>
                    <p className="font-medium">Budget Exceeded: {category}</p>
                    <p className="text-sm">
                      You've spent ${getTotalExpensesByCategory(category)} of your ${budgets[category]} budget.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-3 p-3 bg-green-50 text-green-700 rounded-lg">
              <div>
                <p className="font-medium">You're on track!</p>
                <p className="text-sm">All your spending is within budget limits.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;