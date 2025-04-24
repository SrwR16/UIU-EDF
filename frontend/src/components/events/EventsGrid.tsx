import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import EventCard from './EventCard';
import { Event } from './eventsService';

interface EventsGridProps {
  filteredEvents: Event[];
  selectedType: string;
  timeFilter: string;
  onViewDetails: (event: Event) => void;
  getEventTypeColor: (type: string) => string;
}

const EventsGrid: React.FC<EventsGridProps> = ({
  filteredEvents,
  selectedType,
  timeFilter,
  onViewDetails,
  getEventTypeColor
}) => {
  return (
    <div>
      {filteredEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onViewDetails={onViewDetails}
              getEventTypeColor={getEventTypeColor}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-orange-200"
          >
            <Calendar className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-600">
              There are no {timeFilter !== 'all' ? (timeFilter === 'upcoming' ? 'upcoming' : 'past') : ''} events
              {selectedType !== 'all' ? ` of type ${selectedType}` : ''}.
              Try adjusting your filters.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;