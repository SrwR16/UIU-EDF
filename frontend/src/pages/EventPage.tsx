import { format } from "date-fns";
import { Calendar, ChevronLeft, Clock, Download, ExternalLink, MapPin, Tag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Event, getEventById, getEventTypeColor } from "../components/events/eventsService";
import RecentEventsPanel from "../components/events/RecentEventsPanel";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const fromHomePage = location.state?.from === "homepage";
  const fromEvent = location.state?.from === "event";

  const handleGoBack = () => {
    if (fromHomePage) {
      navigate("/");
    } else if (fromEvent) {
      navigate("/events");
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-orange-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Event not found"}</h2>
          <p className="text-gray-600 mb-6">We couldn't find the event you're looking for.</p>
          <Link
            to="/events"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {fromHomePage ? "Back to homepage" : fromEvent ? "Back to events" : "Back"}
        </button>

        {/* Main event card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
          {/* Event image */}
          <div className="relative h-64 md:h-80">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                {event.type}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

            {/* Status indicator */}
            <div className="mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                <Tag size={16} className="mr-2" />
                {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
              </span>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                  <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
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
                  <span>{event.capacity} seats</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>

            {/* Speakers section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">Featured Speakers</h3>
                <div className="grid gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-start">
                        {speaker.image && (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                        )}
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
            )}

            {/* Materials section */}
            {event.materials && event.materials.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-black">Event Materials</h3>
                <div className="space-y-2">
                  {event.materials.map((material, index) => (
                    <a
                      key={index}
                      href={material.url}
                      className="group flex items-center p-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
                    >
                      <div className="bg-orange-100 text-orange-500 rounded-lg p-2 mr-3 group-hover:bg-orange-200 transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors">
                          {material.name}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Registration button - only for upcoming events */}
            {event.status === "upcoming" && (
              <div className="flex justify-center mt-8">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  Register Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <RecentEventsPanel excludeId={id} limit={3} showPastEvents={false} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
