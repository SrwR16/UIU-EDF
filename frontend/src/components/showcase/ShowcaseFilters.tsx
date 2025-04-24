import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface ShowcaseFiltersProps {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

const ShowcaseFilters: React.FC<ShowcaseFiltersProps> = ({
  categories,
  selectedCategory,
  searchQuery,
  setSelectedCategory,
  setSearchQuery
}) => {
  return (
    <div className="mb-12 space-y-4">
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search ventures by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-md border-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-lg"
          />
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto py-2">
        <div className="bg-white rounded-lg shadow-md p-2 inline-flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseFilters;