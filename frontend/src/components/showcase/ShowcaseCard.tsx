import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { Business } from './showcaseService';

interface ShowcaseCardProps {
  business: Business;
  index: number;
  inView: boolean;
  onSelect: (business: Business) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  business,
  index,
  inView,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="group relative h-full flex flex-col"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-gray-200">
        <div className="h-3 bg-orange-500 w-full"></div>
        
        <div className="relative h-48">
          <img
            src={business.logo}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/50 to-transparent"></div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
            {business.name}
          </h3>
          
          <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
            {business.description}
          </p>
          
          {business.achievements.length > 0 && (
            <div className="mb-6 flex items-center bg-orange-100 p-3 rounded-lg border-l-4 border-orange-500">
              <Award className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{business.achievements[0]}</p>
            </div>
          )}
          
          <button
            onClick={() => onSelect(business)}
            className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center mt-auto"
          >
            View Details <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500 transition-all duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default ShowcaseCard;