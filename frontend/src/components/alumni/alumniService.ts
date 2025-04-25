export interface Alumni {
  id: string;
  name: string;
  graduation: string;
  company: string;
  role: string;
  location: string;
  industry: string;
  image: string;
  success: string;
  achievements: string[];
  stats: Record<string, string>;
  email: string;
  linkedin: string;
  profileUrl: string;
}

interface Industry {
  id: string;
  name: string;
}

// Define the base API URL - should come from environment config
const API_BASE_URL = ""; // Will be updated when Django backend is ready

// Get industries (mock data)
export const getIndustries = async (): Promise<Industry[]> => {
  return [
    { id: "all", name: "All Industries" },
    { id: "technology", name: "Technology" },
    { id: "healthcare", name: "Healthcare" },
    { id: "finance", name: "Finance" },
    { id: "sustainability", name: "Sustainability" },
    { id: "education", name: "Education" },
  ];
};

// Get alumni with optional filters (mock data or real fetch logic)
export const getAlumni = async (industryId?: string): Promise<Alumni[]> => {
  // Use mock data for development purposes
  return getMockAlumni();

  // Here's the Django REST API integration code (commented for now):
  /*
  try {
    let url = `${API_BASE_URL}/api/alumni/`;
    const params: Record<string, string> = {};

    if (industryId && industryId !== 'all') {
      params.industry = industryId;
    }

    const response = await fetch(url + '?' + new URLSearchParams(params), {
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers here
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch alumni');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching alumni:', error);
    return [];
  }
  */
};

// Mock data for development
export const getMockAlumni = (): Alumni[] => {
  return [
    {
      id: "1",
      name: "Sarah Johnson",
      graduation: "2020",
      company: "Tesla",
      role: "Product Manager",
      location: "San Francisco, CA",
      industry: "technology",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      success: "Led the launch of Tesla's new energy management platform",
      achievements: ["Forbes 30 Under 30", "2M+ users impacted", "3 patents filed"],
      stats: {
        revenue: "$50M+",
        team: "15",
        markets: "Global",
      },
      email: "sarah@example.com",
      linkedin: "#",
      profileUrl: "#",
    },
    {
      id: "2",
      name: "Michael Chang",
      graduation: "2019",
      company: "Google",
      role: "Senior Software Engineer",
      location: "Mountain View, CA",
      industry: "technology",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      success: "Developed key features for Google Cloud Platform",
      achievements: ["Tech Innovation Award", "100M+ users reached", "Open source contributor"],
      stats: {
        projects: "20+",
        impact: "Global",
        recognition: "5 Awards",
      },
      email: "michael@example.com",
      linkedin: "#",
      profileUrl: "#",
    },
  ];
};
