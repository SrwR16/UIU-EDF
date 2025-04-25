import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronRight, Clock, MapPin, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import NoticeTicker from "../components/notices/NoticeTicker";

const Home = () => {
  const stats = [
    { label: "Active Members", value: "500+", icon: Users },
    { label: "Success Stories", value: "100+", icon: Trophy },
    { label: "Workshops/Year", value: "50+", icon: Calendar },
  ];

  // State to hold the current animated values
  const [animatedStats, setAnimatedStats] = useState(
    stats.map((stat) => ({
      ...stat,
      currentValue: 0,
    }))
  );

  // Animation effect
  useEffect(() => {
    const targetValues = stats.map((stat) => parseInt(stat.value));
    const frames = 50;
    let frame = 0;

    const interval = setInterval(() => {
      if (frame >= frames) {
        clearInterval(interval);
        return;
      }

      const progress = frame / frames;
      const newStats = stats.map((stat, index) => {
        const targetValue = parseInt(stat.value);
        const currentValue = Math.floor(targetValue * progress);

        return {
          ...stat,
          currentValue: currentValue,
        };
      });

      setAnimatedStats(newStats);
      frame++;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const featuredEvents = [
    {
      id: "1",
      title: "Startup Weekend 2025",
      date: new Date("2025-03-15"),
      type: "conference",
      description:
        "Join us for an intensive 54-hour event where you'll experience the highs, lows, fun, and pressure that make up life at a startup. You'll learn how to create a real company and meet the very best mentors, investors, cofounders, and sponsors who are ready to help you get started.",
      location: "Innovation Hub, Downtown Campus",
      duration: "54 hours",
      capacity: 150,
      registrationUrl: "#register",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "2",
      title: "Tech Innovation Summit",
      date: new Date("2025-04-05"),
      type: "seminar",
      description:
        "Explore the latest trends in technology and entrepreneurship with industry leaders. Learn about AI, blockchain, and other emerging technologies that are shaping the future of business.",
      location: "Virtual Event",
      duration: "6 hours",
      capacity: 300,
      registrationUrl: "#register",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "3",
      title: "Venture Capital Workshop",
      date: new Date("2025-04-20"),
      type: "workshop",
      description:
        "Learn the ins and outs of venture capital funding. This hands-on workshop will teach you how to create a compelling pitch deck, understand term sheets, and negotiate with investors.",
      location: "Business School, Room 401",
      duration: "4 hours",
      capacity: 50,
      registrationUrl: "#register",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
  ];

  const communityGallery = [
    {
      image:
        "https://images.unsplash.com/photo-1534081333815-ae5019106622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Innovation Summit",
      description: "Keynote session on emerging technologies.",
      date: "January 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515165562835-c4a785ef926e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Hackathon Winners",
      description: "Team CodeCrafters celebrating their win.",
      date: "February 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Networking Mixer",
      description: "Members connecting at our monthly social.",
      date: "March 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Workshop Series",
      description: "Learning UX design principles.",
      date: "February 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Community Outreach",
      description: "Teaching coding to local students.",
      date: "April 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517430816045-df4b7de01e63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Investor Pitch Day",
      description: "Startups presenting to venture capitalists.",
      date: "March 2025",
    },
  ];

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: "bg-orange-100 text-orange-800",
      seminar: "bg-orange-100 text-orange-800",
      networking: "bg-orange-100 text-orange-800",
      conference: "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <main>
      <Hero />
      <NoticeTicker />

      <div className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl">
              {animatedStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.currentValue}+</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-black">Featured Events</h2>
            <Link to="/events" className="flex items-center text-orange-600 hover:text-orange-800 transition-colors">
              View all events <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
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
                      <span>{format(event.date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-end">
                    <Link
                      to={`/events/${event.id}`}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Community Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Moments captured from our vibrant entrepreneurial community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {communityGallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl shadow-md"
                style={{
                  height: index % 3 === 0 ? "240px" : index % 3 === 1 ? "280px" : "220px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                  <p className="text-xs text-orange-300 mt-1">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-orange-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-orange-200 mb-8">
            Join our community and turn your entrepreneurial dreams into reality
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Become a Member <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Newsletter />
    </main>
  );
};

export default Home;
