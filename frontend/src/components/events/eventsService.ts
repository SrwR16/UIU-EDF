import {
  getEvents as apiGetEvents,
  getEventTopics as apiGetEventTopics,
  getEventTypes as apiGetEventTypes,
  getFeaturedEvents as apiGetFeaturedEvents,
} from "../../lib/api";

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
  end_date?: string | null; // Add end_date field
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
  status: "upcoming" | "past";
  is_featured: boolean;
}

export interface EventType {
  id: string;
  name: string;
  slug: string;
  color_class?: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
}

// Get event types from API
export const getEventTypes = async (): Promise<EventType[]> => {
  try {
    const types = await apiGetEventTypes();
    // Add 'All Types' option at the beginning
    return [{ id: "all", name: "All Types", slug: "all" }, ...types];
  } catch (error) {
    console.error("Error fetching event types:", error);
    // Return mock data as fallback
    return [
      { id: "all", name: "All Types", slug: "all" },
      { id: "workshop", name: "Workshops", slug: "workshop" },
      { id: "seminar", name: "Seminars", slug: "seminar" },
      { id: "networking", name: "Networking", slug: "networking" },
      { id: "conference", name: "Conferences", slug: "conference" },
    ];
  }
};

// Get topics from API
export const getTopics = async (): Promise<Topic[]> => {
  try {
    const topics = await apiGetEventTopics();
    // Add 'All Topics' option at the beginning
    return [{ id: "all", name: "All Topics", slug: "all" }, ...topics];
  } catch (error) {
    console.error("Error fetching topics:", error);
    // Return mock data as fallback
    return [
      { id: "all", name: "All Topics", slug: "all" },
      { id: "entrepreneurship", name: "Entrepreneurship", slug: "entrepreneurship" },
      { id: "technology", name: "Technology", slug: "technology" },
      { id: "finance", name: "Finance", slug: "finance" },
      { id: "marketing", name: "Marketing", slug: "marketing" },
    ];
  }
};

export const getEvents = async (typeId?: string, topicId?: string, showPast?: boolean): Promise<Event[]> => {
  try {
    console.log(`Fetching ${showPast ? "PAST" : "UPCOMING"} events (typeId: ${typeId}, topicId: ${topicId})`);

    // Use regular endpoint with params instead of specialized endpoints
    const params: Record<string, string> = {};

    if (typeId && typeId !== "all") {
      params.event_type__id = typeId;
    }

    if (topicId && topicId !== "all") {
      params.topic__id = topicId;
    }

    // Add status parameter based on showPast
    params.status = showPast ? "past" : "upcoming";

    console.log("Using regular API endpoint with params:", params);
    const response = await apiGetEvents(params);

    console.log("API raw response:", response);

    // Don't use mock data for empty arrays - this is likely a valid empty response
    if (!response) {
      console.error("API returned null or undefined");
      return [];
    }

    // Transform response to match the Event interface
    const eventsData = Array.isArray(response) ? response : response.results ? response.results : [];

    console.log(`Transforming ${eventsData.length} events from API`);

    return eventsData.map((event: any) => {
      // Consider both start date and end date when determining if an event is past
      const now = new Date();
      const eventDate = new Date(event.date);
      const endDate = event.end_date ? new Date(event.end_date) : null;

      // If the backend already provided a status, use it
      const backendStatus = event.status;

      // An event is past if:
      // - it has an end_date and that date is in the past, OR
      // - it has no end_date and its start date is in the past
      const isPast = endDate ? endDate < now : eventDate < now;

      // Determine the final status - prioritize showPast param, then backend status, then our calculation
      const status =
        showPast === true
          ? "past"
          : showPast === false
          ? "upcoming"
          : backendStatus
          ? backendStatus
          : isPast
          ? "past"
          : "upcoming";

      return {
        id: event.id.toString(),
        title: event.title,
        date: event.date,
        end_date: event.end_date || null,
        type: event.type || "Unknown",
        topic: event.topic_name || "General",
        description: event.description || "",
        location: event.location || "TBD",
        capacity: event.capacity || 0,
        registrationUrl: event.registration_url || "#",
        image: event.image || "https://placehold.co/600x400?text=No+Image",
        duration: event.duration || "TBD",
        speakers: event.speakers || [],
        materials: event.materials || [],
        status: status, // Use the determined status
        is_featured: !!event.is_featured,
      };
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    // Only return mock data in case of actual errors, not empty responses
    return [];
  }
};

// Get featured events for homepage
export const getFeaturedEvents = async (): Promise<Event[]> => {
  try {
    const response = await apiGetFeaturedEvents();
    console.log("Featured events API response:", response);

    // Don't use mock data for empty arrays
    if (!response) {
      console.error("Featured events API returned null or undefined");
      return [];
    }

    // Transform response to match the Event interface
    return (Array.isArray(response) ? response : []).map((event: any) => ({
      id: event.id.toString(),
      title: event.title,
      date: event.date,
      type: event.type,
      topic: event.topic_name,
      description: event.description,
      location: event.location,
      capacity: event.capacity,
      registrationUrl: event.registration_url,
      image: event.image,
      duration: event.duration,
      speakers: event.speakers || [],
      materials: event.materials || [],
      status: event.status,
      is_featured: event.is_featured,
    }));
  } catch (error) {
    console.error("Error fetching featured events:", error);
    return []; // Return empty array instead of mock data
  }
};

// Get event type color
export const getEventTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    Workshop: "bg-orange-100 text-orange-800",
    Seminar: "bg-blue-100 text-blue-800",
    Networking: "bg-green-100 text-green-800",
    Conference: "bg-purple-100 text-purple-800",
    // Add lowercase versions for case insensitivity
    workshop: "bg-orange-100 text-orange-800",
    seminar: "bg-blue-100 text-blue-800",
    networking: "bg-green-100 text-green-800",
    conference: "bg-purple-100 text-purple-800",
  };

  return colors[type] || "bg-gray-100 text-gray-800";
};

// Keep the mock data function for fallback
export const getMockEvents = (): Event[] => {
  // Existing mock data implementation
  return [
    {
      id: "1",
      title: "Startup Weekend 2025",
      date: "2025-03-15",
      type: "conference",
      topic: "entrepreneurship",
      description:
        "Join us for an intensive 54-hour event where you'll experience the highs, lows, fun, and pressure that make up life at a startup. You'll learn how to create a real company and meet the very best mentors, investors, cofounders, and sponsors who are ready to help you get started.",
      location: "Innovation Hub, Downtown Campus",
      capacity: 150,
      registrationUrl: "#register",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      duration: "54 hours",
      status: "upcoming",
      is_featured: true,
      speakers: [
        {
          name: "Sarah Johnson",
          role: "Startup Mentor",
          company: "TechStars",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          bio: "Sarah is a serial entrepreneur with 3 successful exits. She now mentors early-stage startups.",
          linkedin: "#",
          twitter: "#",
        },
      ],
      materials: [],
    },
    {
      id: "2",
      title: "Tech Innovation Summit",
      date: "2025-04-05",
      type: "seminar",
      topic: "technology",
      description:
        "Explore the latest trends in technology and entrepreneurship with industry leaders. Learn about AI, blockchain, and other emerging technologies that are shaping the future of business.",
      location: "Virtual Event",
      capacity: 300,
      registrationUrl: "#register",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      duration: "6 hours",
      status: "upcoming",
      is_featured: true,
      speakers: [
        {
          name: "Dr. Emily Wong",
          role: "AI Research Director",
          company: "Tech Innovations Lab",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          bio: "Dr. Wong leads cutting-edge research in artificial intelligence and machine learning.",
          linkedin: "#",
        },
      ],
      materials: [],
    },
  ];
};
