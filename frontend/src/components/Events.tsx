import React, { useState } from 'react';
import { Calendar, Filter, MapPin, Clock, Users, Download, ExternalLink, X } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'workshop' | 'seminar' | 'networking' | 'conference';
  topic: string;
  description: string;
  location: string;
  capacity: number;
  registrationUrl: string;
  image: string;
  materials?: {
    name: string;
    url: string;
  }[];
}

const Events = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: '1',
      title: 'Startup Weekend 2025',
      date: new Date('2025-03-15'),
      type: 'conference',
      topic: 'entrepreneurship',
      description: 'Join us for an intensive 54-hour event where you\'ll experience the highs, lows, fun, and pressure that make up life at a startup. You\'ll learn how to create a real company and meet the very best mentors, investors, cofounders, and sponsors who are ready to help you get started.',
      location: 'Innovation Hub, Downtown Campus',
      capacity: 150,
      registrationUrl: '#register',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: '2',
      title: 'Tech Innovation Summit',
      date: new Date('2025-04-05'),
      type: 'seminar',
      topic: 'technology',
      description: 'Explore the latest trends in technology and entrepreneurship with industry leaders. Learn about AI, blockchain, and other emerging technologies that are shaping the future of business.',
      location: 'Virtual Event',
      capacity: 300,
      registrationUrl: '#register',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: '3',
      title: 'Venture Capital Workshop',
      date: new Date('2025-04-20'),
      type: 'workshop',
      topic: 'finance',
      description: 'Learn the ins and outs of venture capital funding. This hands-on workshop will teach you how to create a compelling pitch deck, understand term sheets, and negotiate with investors.',
      location: 'Business School, Room 401',
      capacity: 50,
      registrationUrl: '#register',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      materials: [
        {
          name: 'Pitch Deck Template',
          url: '#download',
        },
        {
          name: 'Term Sheet Guide',
          url: '#download',
        },
      ],
    },
  ];

  const pastEvents: Event[] = [
    {
      id: '4',
      title: 'Marketing Masterclass',
      date: new Date('2024-12-15'),
      type: 'workshop',
      topic: 'marketing',
      description: 'A comprehensive masterclass on digital marketing strategies for startups.',
      location: 'Online',
      capacity: 100,
      registrationUrl: '#',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      materials: [
        {
          name: 'Marketing Strategy Template',
          url: '#download',
        },
        {
          name: 'Workshop Recording',
          url: '#download',
        },
      ],
    },
  ];

  const allEvents = showPastEvents ? [...events, ...pastEvents] : events;

  const filteredEvents = allEvents.filter(event => {
    if (selectedType !== 'all' && event.type !== selectedType) return false;
    if (selectedTopic !== 'all' && event.topic !== selectedTopic) return false;
    return true;
  });

  const eventTypes = ['all', 'workshop', 'seminar', 'networking', 'conference'];
  const topics = ['all', 'entrepreneurship', 'technology', 'finance', 'marketing'];

  return (
    <div className="bg-gray-50 py-16" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Events & Workshops</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowPastEvents(!showPastEvents)}
              className={`px-4 py-2 rounded-md ${
                showPastEvents
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(event.date, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.capacity} spots</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                    <a
                      href={event.registrationUrl}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Register
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedEvent.title}
                  </h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{format(selectedEvent.date, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{selectedEvent.capacity} spots available</span>
                  </div>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                  
                  {selectedEvent.materials && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Event Materials
                      </h4>
                      <div className="space-y-2">
                        {selectedEvent.materials.map((material, index) => (
                          <a
                            key={index}
                            href={material.url}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {material.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-end">
                    <a
                      href={selectedEvent.registrationUrl}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;