// src/components/leadership/LeadershipGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import MemberCard, { Member } from './MemberCard';

interface LeadershipGridProps {
  filteredMembers: Member[];
  selectedDepartment: string;
  timeFilter: string;
  getDepartmentName: (deptId: string) => string;
}

const LeadershipGrid: React.FC<LeadershipGridProps> = ({
  filteredMembers,
  selectedDepartment,
  timeFilter,
  getDepartmentName
}) => {
  return (
    <div>
      {/* Leadership Cards */}
      {filteredMembers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <MemberCard 
              key={member.name}
              member={member}
              index={index}
              getDepartmentName={getDepartmentName}
            />
          ))}
        </div>
      ) : (
        // Empty State - Show when no members match filters
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto"
          >
            <Users className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No members found</h3>
            <p className="text-gray-600">
              There are no {timeFilter !== 'all' ? (timeFilter === 'current' ? 'current' : 'past') : ''} members 
              {selectedDepartment !== 'all' ? ` in the ${getDepartmentName(selectedDepartment)} department` : ''}.
              Try changing your filters.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeadershipGrid;