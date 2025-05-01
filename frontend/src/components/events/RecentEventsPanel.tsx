import { Calendar, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Event, getEvents } from "./eventsService";

interface RecentEventsPanelProps {
  excludeId?: string;
  limit?: number;
  showPastEvents?: boolean;
}

const RecentEventsPanel: React.FC<RecentEventsPanelProps> = ({ excludeId, limit = 3, showPastEvents = false }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true);
        const allEvents = await getEvents("all", "all", showPastEvents);
        let filteredEvents = allEvents;

        if (excludeId) {
          filteredEvents = allEvents.filter((event) => event.id !== excludeId);
        }

        setEvents(filteredEvents.slice(0, limit));
      } catch (error) {
        console.error("Error fetching recent events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, [excludeId, limit, showPastEvents]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-5 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link key={event.id} to={`/events/${event.id}`} state={{ from: "event" }} className="block">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 h-full">
            <div className="h-40 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-5 flex flex-col h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>

              <div className="flex items-center space-x-3 mb-3">
                <span className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.duration}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{event.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentEventsPanel;
