import React, { useState } from 'react';
import { Calendar, DollarSign, Tag, FileText, AlertCircle } from 'lucide-react';

interface ExpenseFormProps {
  addExpense: (expense: {
    description: string;
    amount: number;
    category: string;
    date: string;
  }) => void;
  categories: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense, categories }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addExpense({
        description,
        amount: Number(amount),
        category,
        date
      });
      
      // Reset form
      setDescription('');
      setAmount('');
      setCategory(categories[0]);
      setDate(new Date().toISOString().split('T')[0]);
      setErrors({});
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h1>
      
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
          <p className="font-medium">Expense added successfully!</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileText size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="What did you spend on?"
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" />
              {errors.description}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" />
              {errors.amount}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag size={18} className="text-gray-400" />
            </div>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          {errors.date && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle size={14} className="mr-1" />
              {errors.date}
            </p>
          )}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Add Expense
          </button>
        </div>
      </form>
      
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-blue-800 font-medium">Tips:</h3>
        <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
          <li>Be specific with descriptions to better track your spending</li>
          <li>Categorize expenses correctly to get accurate budget insights</li>
          <li>Add expenses as soon as possible to maintain accurate records</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpenseForm;