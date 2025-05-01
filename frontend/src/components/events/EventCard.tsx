import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Event } from "./eventsService";

interface EventCardProps {
  event: Event;
  index: number;
  onViewDetails: (event: Event) => void;
  getEventTypeColor: (type: string) => string;
  buttonText?: string; // Optional custom button text
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  index,
  onViewDetails,
  getEventTypeColor,
  buttonText = "View Details", // Default text
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-orange-200"
    >
      <div className="relative h-48">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
            {event.type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
            <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 mr-2 text-orange-500" />
            <span>{event.capacity} seats</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        <div className="flex justify-between items-center">
          <Link to={`/events/${event.id}`} className="text-orange-600 hover:text-orange-800 font-medium">
            View Details
          </Link>
          {event.status !== "past" && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
