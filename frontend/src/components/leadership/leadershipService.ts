import { Member } from './MemberCard';

interface Department {
  id: string;
  name: string;
}

interface TimePeriod {
  id: string;
  name: string;
}

// Define the base API URL - should come from environment config
const API_BASE_URL = ''; // No requests will actually be sent for now, adjust this when the backend is available

// Get departments (mock data)
export const getDepartments = async (): Promise<Department[]> => {
  // Mock departments list
  return [
    { id: 'all', name: 'All Departments' },
    { id: 'executiveTeam', name: 'Executive Team' },
    { id: 'operations', name: 'Operations' },
    { id: 'hr', name: 'HR' },
    { id: 'pr', name: 'PR' },
    { id: 'branding', name: 'Branding' },
    { id: 'events', name: 'Events' },
    { id: 'rd', name: 'R&D' },
    { id: 'tech', name: 'Tech' },
    { id: 'advisory', name: 'Advisors' }
  ];
};

// Get time periods (mock data)
export const getTimePeriods = async (): Promise<TimePeriod[]> => {
  // Mock time periods list
  return [
    { id: 'all', name: 'All Time' },
    { id: 'current', name: 'Current Members' },
    { id: 'past', name: 'Past Members' }
  ];
};

// Get members with optional filters (mock data or real fetch logic)
export const getMembers = async (departmentId?: string, timeFilter?: string): Promise<Member[]> => {
  // Use mock data for development purposes
  return getMockMembers();

  // Here's the real fetch logic, for later when API is ready:
  /*
  try {
    let url = `${API_BASE_URL}/members/`;
    const params: Record<string, string> = {};
    
    if (departmentId && departmentId !== 'all') {
      params.department = departmentId;
    }
    
    if (timeFilter && timeFilter !== 'all') {
      params.status = timeFilter;
    }
    
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  */
};

// Get department name by ID
export const getDepartmentName = (departments: Department[], deptId: string): string => {
  if (deptId === 'all') return 'All Departments';
  const dept = departments.find(d => d.id === deptId);
  return dept ? dept.name : deptId;
};

// Mock data for development
export const getMockMembers = (): Member[] => {
  return [
    {
      name: 'Dr. Sarah Chen',
      role: 'President',
      department: 'executiveTeam',
      position: 1,
      image: '/api/placeholder/400/400',
      bio: 'Dr. Chen brings 15 years of experience in entrepreneurship and innovation leadership. She has successfully founded three startups and mentored over 100 entrepreneurs.',
      term: '2024-2026',
      status: 'current',
      previousRoles: [
        { role: 'Vice President', department: 'executiveTeam', term: '2022-2024' }
      ],
      achievements: [
        'Founded 3 successful startups',
        'Published author on entrepreneurship',
        'Forbes 30 Under 30'
      ],
      contact: {
        email: 'sarah.chen@organization.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'John Doe',
      role: 'Vice President',
      department: 'operations',
      position: 2,
      image: '/api/placeholder/400/400',
      bio: 'John has been a leader in operations for 10 years, streamlining processes and ensuring effective resource management.',
      term: '2022-2024',
      status: 'past',
      previousRoles: [
        { role: 'Manager', department: 'operations', term: '2020-2022' }
      ],
      achievements: [
        'Increased operational efficiency by 30%',
        'Implemented resource-saving strategies'
      ],
      contact: {
        email: 'john.doe@organization.org',
        linkedin: '#',
        twitter: '#'
      }
    },
    // Add more mock members here as needed
  ];
};
