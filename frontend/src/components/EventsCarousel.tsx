import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const events = [
    {
      title: 'Startup Weekend 2025',
      date: 'March 15-17, 2025',
      description: 'Join us for 54 hours of entrepreneurial action!',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    },
    {
      title: 'Tech Innovation Summit',
      date: 'April 5, 2025',
      description: 'Explore the latest trends in technology and entrepreneurship',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    },
    {
      title: 'Venture Capital Workshop',
      date: 'April 20, 2025',
      description: 'Learn how to pitch to investors and secure funding',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="relative bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative h-96">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                      <div className="p-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <p className="text-lg mb-2">{event.date}</p>
                        <p className="text-gray-200">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsCarousel;