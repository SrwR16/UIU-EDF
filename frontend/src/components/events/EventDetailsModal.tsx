import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from './eventsService';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
  getEventTypeColor: (type: string) => string;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  getEventTypeColor
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-400"
      >
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-black mb-2">
              {event.title}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
              {event.type}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                <span>{event.duration}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-2 text-orange-500" />
                <span>{event.capacity} spots available</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-black mb-4">Featured Speakers</h3>
            <div className="grid gap-6">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-start">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-black">{speaker.name}</h4>
                      <p className="text-gray-700">{speaker.role}</p>
                      <p className="text-gray-700">{speaker.company}</p>
                      <p className="text-gray-700 mt-2">{speaker.bio}</p>
                      <div className="flex space-x-4 mt-2">
                        {speaker.linkedin && (
                          <a href={speaker.linkedin} className="text-orange-500 hover:text-orange-700">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {event.materials && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-black">Event Materials</h3>
              <div className="space-y-2">
                {event.materials.map((material, index) => (
                  <a
                    key={index}
                    href={material.url}
                    className="flex items-center text-orange-600 hover:text-orange-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {material.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <a
              href={event.registrationUrl}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
            >
              Register Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetailsModal;