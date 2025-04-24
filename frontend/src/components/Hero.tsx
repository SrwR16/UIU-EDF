import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Future
            <span className="block text-orange-500">Entrepreneurs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join a thriving community of innovators, access world-class resources,
            and transform your ideas into successful ventures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/membership"
              className="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
            >
              Join UEDF <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/events"
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center border border-orange-600"
            >
              Explore Events <Calendar className="w-5 h-5 ml-2 text-orange-600" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;