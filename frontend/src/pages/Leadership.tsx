// src/pages/leadership.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LeadershipFilters from '../components/leadership/LeadershipFilters';
import LeadershipGrid from '../components/leadership/LeadershipGrid';
import { getDepartments, getTimePeriods, getMembers, getDepartmentName, getMockMembers } from '../components/leadership/leadershipService';
import { Member } from '../components/leadership/MemberCard';

interface Department {
  id: string;
  name: string;
}

interface TimePeriod {
  id: string;
  name: string;
}

const Leadership: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('current');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [timePeriods, setTimePeriods] = useState<TimePeriod[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch departments and time periods in parallel
        const [depts, periods] = await Promise.all([
          getDepartments(),
          getTimePeriods()
        ]);
        
        setDepartments(depts);
        setTimePeriods(periods);
        
        // Fetch members with default filters
        await fetchMembers('all', 'current');
      } catch (error) {
        console.error('Error loading initial data:', error);
        // Load mock data if API fails
        setMembers(getMockMembers());
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Fetch members when filters change
  useEffect(() => {
    fetchMembers(selectedDepartment, timeFilter);
  }, [selectedDepartment, timeFilter]);

  // Function to fetch members with current filters
  const fetchMembers = async (departmentId: string, timeStatus: string) => {
    setLoading(true);
    try {
      const data = await getMembers(departmentId, timeStatus);
      setMembers(data);
    } catch (error) {
      console.error('Error fetching filtered members:', error);
      // Load mock data and filter it client-side as fallback
      const mockData = getMockMembers();
      const filteredData = mockData.filter(member => {
        const departmentMatch = departmentId === 'all' || member.department === departmentId;
        const timeMatch = timeStatus === 'all' || member.status === timeStatus;
        return departmentMatch && timeMatch;
      });
      setMembers(filteredData);
    } finally {
      setLoading(false);
    }
  };

  // Get department name helper function
  const getDepartmentDisplayName = (deptId: string): string => {
    return getDepartmentName(departments, deptId);
  };

  // Filter and sort members
  const filteredMembers = members
    .filter(member => {
      const departmentMatch = selectedDepartment === 'all' || member.department === selectedDepartment;
      const timeMatch = timeFilter === 'all' || member.status === timeFilter;
      return departmentMatch && timeMatch;
    })
    .sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-black mb-4">Our Leadership Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated individuals who drive our mission forward, both past and present
          </p>
        </motion.div>

        {loading ? (
          // Loading state
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Filters Component */}
            <LeadershipFilters
              departments={departments}
              timePeriods={timePeriods}
              selectedDepartment={selectedDepartment}
              timeFilter={timeFilter}
              setSelectedDepartment={setSelectedDepartment}
              setTimeFilter={setTimeFilter}
              getDepartmentName={getDepartmentDisplayName}
            />
            
            {/* Grid Component */}
            <LeadershipGrid
              filteredMembers={filteredMembers}
              selectedDepartment={selectedDepartment}
              timeFilter={timeFilter}
              getDepartmentName={getDepartmentDisplayName}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Leadership;