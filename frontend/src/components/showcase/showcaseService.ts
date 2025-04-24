export interface Founder {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  image: string;
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  description: string;
  founder: Founder;
  category: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  achievements: string[];
}

interface Category {
  id: string;
  name: string;
}

// Define the base API URL - should come from environment config
const API_BASE_URL = ''; // Will be updated when Django backend is ready

// Get categories (mock data)
export const getCategories = async (): Promise<Category[]> => {
  // Mock categories list
  return [
    { id: 'all', name: 'All Ventures' },
    { id: 'tech', name: 'Technology' },
    { id: 'health', name: 'Healthcare' },
    { id: 'edu', name: 'Education' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'sustainability', name: 'Sustainability' }
  ];
};

// Get businesses with optional filters (mock data or real fetch logic)
export const getBusinesses = async (categoryId?: string): Promise<Business[]> => {
  // Use mock data for development purposes
  return getMockBusinesses();

  // Here's the Django REST API integration code (commented for now):
  /*
  try {
    let url = `${API_BASE_URL}/api/businesses/`;
    const params: Record<string, string> = {};
    
    if (categoryId && categoryId !== 'all') {
      params.category = categoryId;
    }
    
    const response = await fetch(url + '?' + new URLSearchParams(params), {
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers here
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch businesses');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }
  */
};

// Mock data for development
export const getMockBusinesses = (): Business[] => {
  return [
    {
      id: '1',
      name: 'EcoTech Solutions',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      description: 'Pioneering sustainable energy solutions for urban communities. Our innovative technology reduces energy consumption while promoting environmental consciousness.',
      founder: {
        name: 'Alex Rivera',
        role: 'CEO & Founder',
        email: 'alex@ecotech.com',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      category: 'sustainability',
      website: 'https://ecotech.example.com',
      socialLinks: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      },
      achievements: [
        'Winner of Green Innovation Award 2024',
        'Featured in TechCrunch',
        'Reduced carbon emissions by 40% in pilot cities'
      ]
    },
    {
      id: '2',
      name: 'HealthConnect',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      description: 'Revolutionizing healthcare accessibility through AI-powered solutions. Connecting patients with healthcare providers seamlessly.',
      founder: {
        name: 'Maria Chen',
        role: 'CEO & Founder',
        email: 'maria@healthconnect.com',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      category: 'health',
      website: 'https://healthconnect.example.com',
      socialLinks: {
        linkedin: '#',
        twitter: '#'
      },
      achievements: [
        'Best Healthcare Startup 2024',
        'Series A Funding Secured',
        'Featured in Forbes Healthcare'
      ]
    }
  ];
};