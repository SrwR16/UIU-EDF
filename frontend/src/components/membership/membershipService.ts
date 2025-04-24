export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  major: string;
  trimester: string;
  studentPhoto: File | null;
  studentIdPhoto: File | null;
  acceptTerms: boolean;
}

// Define the base API URL - should come from environment config
const API_BASE_URL = ''; // Will be updated when Django backend is ready

// Register new member
export const registerMember = async (data: RegistrationData): Promise<void> => {
  // Here's the Django REST API integration code (commented for now):
  /*
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/membership/register/`, {
      method: 'POST',
      body: formData,
      // Add any required authentication headers here
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error registering member:', error);
    throw error;
  }
  */

  // Simulate API call for development
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
};

// Get membership benefits
export const getMembershipBenefits = async () => {
  return [
    {
      icon: 'Users',
      title: 'Network & Connect',
      description: 'Meet fellow students and industry professionals'
    },
    {
      icon: 'BookOpen',
      title: 'Learn & Grow',
      description: 'Access exclusive workshops and educational content'
    },
    {
      icon: 'Trophy',
      title: 'Build Your Profile',
      description: 'Add valuable experience to your resume'
    }
  ];
};

// Get membership plan
export const getMembershipPlan = async () => {
  return {
    name: 'University Student',
    price: '400',
    currency: 'BDT',
    period: 'lifetime',
    features: [
      'Access to workshops and events',
      'Networking opportunities with industry professionals',
      'Exclusive Perks (Discount coupon, Priority access)'
    ]
  };
};