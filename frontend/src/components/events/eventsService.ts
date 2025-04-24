export interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  topic: string;
  description: string;
  location: string;
  capacity: number;
  registrationUrl: string;
  image: string;
  duration: string;
  speakers: Speaker[];
  materials?: {
    name: string;
    url: string;
  }[];
  status: 'upcoming' | 'past';
}

interface EventType {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
}

// Define the base API URL - should come from environment config
const API_BASE_URL = ''; // Adjust this when the backend is available

// Get event types (mock data)
export const getEventTypes = async (): Promise<EventType[]> => {
  // Mock event types list
  return [
    { id: 'all', name: 'All Types' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'seminar', name: 'Seminars' },
    { id: 'networking', name: 'Networking' },
    { id: 'conference', name: 'Conferences' }
  ];
};

// Get topics (mock data)
export const getTopics = async (): Promise<Topic[]> => {
  // Mock topics list
  return [
    { id: 'all', name: 'All Topics' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'technology', name: 'Technology' },
    { id: 'finance', name: 'Finance' },
    { id: 'marketing', name: 'Marketing' }
  ];
};

// Get events with optional filters (mock data or real fetch logic)
export const getEvents = async (
  typeId?: string,
  topicId?: string,
  showPast?: boolean
): Promise<Event[]> => {
  // Use mock data for development purposes
  return getMockEvents();

  // Here's the real fetch logic, for later when API is ready:
  /*
  try {
    let url = `${API_BASE_URL}/events/`;
    const params: Record<string, string> = {};
    
    if (typeId && typeId !== 'all') {
      params.type = typeId;
    }
    
    if (topicId && topicId !== 'all') {
      params.topic = topicId;
    }
    
    if (typeof showPast === 'boolean') {
      params.status = showPast ? 'all' : 'upcoming';
    }
    
    const response = await fetch(url + '?' + new URLSearchParams(params));
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  */
};

// Mock data for development
export const getMockEvents = (): Event[] => {
  return [
    {
      id: '1',
      title: 'Startup Weekend 2025',
      date: '2025-03-15',
      type: 'conference',
      topic: 'entrepreneurship',
      description: "Join us for an intensive 54-hour event where you'll experience the highs, lows, fun, and pressure that make up life at a startup. You'll learn how to create a real company and meet the very best mentors, investors, cofounders, and sponsors who are ready to help you get started.",
      location: 'Innovation Hub, Downtown Campus',
      capacity: 150,
      registrationUrl: '#register',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      duration: '54 hours',
      status: 'upcoming',
      speakers: [
        {
          name: 'Sarah Johnson',
          role: 'Startup Mentor',
          company: 'TechStars',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          bio: 'Sarah is a serial entrepreneur with 3 successful exits. She now mentors early-stage startups.',
          linkedin: '#',
          twitter: '#'
        }
      ]
    },
    {
      id: '2',
      title: 'Tech Innovation Summit',
      date: '2025-04-05',
      type: 'seminar',
      topic: 'technology',
      description: 'Explore the latest trends in technology and entrepreneurship with industry leaders. Learn about AI, blockchain, and other emerging technologies that are shaping the future of business.',
      location: 'Virtual Event',
      capacity: 300,
      registrationUrl: '#register',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      duration: '6 hours',
      status: 'upcoming',
      speakers: [
        {
          name: 'Dr. Emily Wong',
          role: 'AI Research Director',
          company: 'Tech Innovations Lab',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          bio: 'Dr. Wong leads cutting-edge research in artificial intelligence and machine learning.',
          linkedin: '#'
        }
      ]
    }
  ];
};

// Get event type color
export const getEventTypeColor = (type: string): string => {
  const colors = {
    workshop: 'bg-orange-100 text-orange-800',
    seminar: 'bg-orange-100 text-orange-800',
    networking: 'bg-orange-100 text-orange-800',
    conference: 'bg-orange-100 text-orange-800'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};