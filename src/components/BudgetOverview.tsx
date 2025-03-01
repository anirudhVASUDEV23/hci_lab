import React, { useState } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

interface BudgetOverviewProps {
  budgets: Record<string, number>;
  updateBudget: (category: string, amount: number) => void;
  categories: string[];
  getTotalExpensesByCategory: (category: string) => number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ 
  budgets, 
  updateBudget, 
  categories,
  getTotalExpensesByCategory
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEdit = (category: string) => {
    setEditingCategory(category);
    setNewAmount(budgets[category].toString());
    setError('');
  };

  const handleSave = (category: string) => {
    const amount = parseFloat(newAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    updateBudget(category, amount);
    setEditingCategory(null);
    setError('');
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setError('');
  };

  const getTotalBudget = () => {
    return Object.values(budgets).reduce((total, budget) => total + budget, 0);
  };

  const getTotalExpenses = () => {
    return categories.reduce((total, category) => total + getTotalExpensesByCategory(category), 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Budget Management</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-2xl font-bold">${getTotalBudget()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold">${getTotalExpenses()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Remaining</p>
          <p className="text-2xl font-bold">${getTotalBudget() - getTotalExpenses()}</p>
        </div>
      </div>
      
      {/* Budget Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => {
              const budget = budgets[category] || 0;
              const spent = getTotalExpensesByCategory(category);
              const remaining = budget - spent;
              const isOverBudget = remaining < 0;
              
              return (
                <tr key={category} className={isOverBudget ? 'bg-red-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCategory === category ? (
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="block w-full pl-8 pr-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        {error && (
                          <div className="ml-2 text-red-500 text-xs flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            {error}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-900">${budget.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${spent.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                      ${remaining.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingCategory === category ? (
                      <div className="space-x-2">
                        <button
                          onClick={() => handleSave(category)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Budget Tips */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-blue-800 font-medium">Budget Tips:</h3>
        <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
          <li>Allocate at least 50% of your income to necessities like food and utilities</li>
          <li>Try to save 20% of your income for emergencies and future goals</li>
          <li>Limit entertainment and discretionary spending to 30% of your income</li>
          <li>Review and adjust your budgets monthly based on your spending patterns</li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetOverview;