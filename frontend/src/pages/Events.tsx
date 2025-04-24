import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventsFilters from '../components/events/EventsFilters';
import EventsGrid from '../components/events/EventsGrid';
import { Event, getEventTypes, getTopics, getEvents, getEventTypeColor } from '../components/events/eventsService';
import EventDetailsModal from '../components/events/EventDetailsModal';

const Events = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [eventTypes, setEventTypes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [types, topicsList] = await Promise.all([
          getEventTypes(),
          getTopics()
        ]);
        
        setEventTypes(types);
        setTopics(topicsList);
        await fetchEvents('all', 'all', false);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchEvents(selectedType, selectedTopic, showPastEvents);
  }, [selectedType, selectedTopic, showPastEvents]);

  const fetchEvents = async (typeId: string, topicId: string, includePast: boolean) => {
    setLoading(true);
    try {
      const data = await getEvents(typeId, topicId, includePast);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-black mb-4">Events & Workshops</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for exciting workshops, seminars, and networking opportunities to enhance your entrepreneurial journey
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        ) : (
          <>
            <EventsFilters
              eventTypes={eventTypes}
              topics={topics}
              selectedType={selectedType}
              selectedTopic={selectedTopic}
              searchQuery={searchQuery}
              showPastEvents={showPastEvents}
              setSelectedType={setSelectedType}
              setSelectedTopic={setSelectedTopic}
              setSearchQuery={setSearchQuery}
              setShowPastEvents={setShowPastEvents}
            />
            
            <EventsGrid
              filteredEvents={filteredEvents}
              selectedType={selectedType}
              timeFilter={showPastEvents ? 'all' : 'upcoming'}
              onViewDetails={setSelectedEvent}
              getEventTypeColor={getEventTypeColor}
            />
          </>
        )}

        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            getEventTypeColor={getEventTypeColor}
          />
        )}
      </div>
    </div>
  );
};

export default Events;