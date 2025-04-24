import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

interface Industry {
  id: string;
  name: string;
}

interface AlumniFiltersProps {
  industries: Industry[];
  selectedIndustry: string;
  searchTerm: string;
  setSelectedIndustry: (id: string) => void;
  setSearchTerm: (term: string) => void;
}

const AlumniFilters: React.FC<AlumniFiltersProps> = ({
  industries,
  selectedIndustry,
  searchTerm,
  setSelectedIndustry,
  setSearchTerm
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search alumni..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
          >
            {industries.map(industry => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AlumniFilters;