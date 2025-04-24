// src/components/leadership/LeadershipFilters.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Department {
  id: string;
  name: string;
}

interface TimePeriod {
  id: string;
  name: string;
}

interface LeadershipFiltersProps {
  departments: Department[];
  timePeriods: TimePeriod[];
  selectedDepartment: string;
  timeFilter: string;
  setSelectedDepartment: (id: string) => void;
  setTimeFilter: (id: string) => void;
  getDepartmentName: (deptId: string) => string;
}

const LeadershipFilters: React.FC<LeadershipFiltersProps> = ({
  departments,
  timePeriods,
  selectedDepartment,
  timeFilter,
  setSelectedDepartment,
  setTimeFilter,
  getDepartmentName
}) => {
  return (
    <>
      <div className="mb-12 space-y-4">
        {/* Time Period Filter */}
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex space-x-2">
            {timePeriods.map((period) => (
              <button
                key={period.id}
                onClick={() => setTimeFilter(period.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  timeFilter === period.id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex justify-center overflow-x-auto py-2">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex space-x-2">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                  selectedDepartment === dept.id
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Department Heading - Only show when filtering by department */}
      {selectedDepartment !== 'all' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-black">
            {getDepartmentName(selectedDepartment)}
          </h2>
        </motion.div>
      )}
    </>
  );
};

export default LeadershipFilters;