import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Tag } from 'lucide-react';

interface EventType {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
}

interface EventsFiltersProps {
  eventTypes: EventType[];
  topics: Topic[];
  selectedType: string;
  selectedTopic: string;
  searchQuery: string;
  showPastEvents: boolean;
  setSelectedType: (id: string) => void;
  setSelectedTopic: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setShowPastEvents: (show: boolean) => void;
}

const EventsFilters: React.FC<EventsFiltersProps> = ({
  eventTypes,
  topics,
  selectedType,
  selectedTopic,
  searchQuery,
  showPastEvents,
  setSelectedType,
  setSelectedTopic,
  setSearchQuery,
  setShowPastEvents
}) => {
  return (
    <>
      <div className="mb-12 space-y-4">
        {/* Time Period Filter */}
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex space-x-2">
            <button
              onClick={() => setShowPastEvents(false)}
              className={`px-4 py-2 rounded-md transition-colors ${
                !showPastEvents
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setShowPastEvents(true)}
              className={`px-4 py-2 rounded-md transition-colors ${
                showPastEvents
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-500" />
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsFilters;