import React from 'react';
import { motion } from 'framer-motion';
import { X, Globe, Mail, Linkedin, Award } from 'lucide-react';
import { Business } from './showcaseService';

interface ShowcaseModalProps {
  business: Business;
  onClose: () => void;
}

const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ business, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <img src={business.logo} alt={business.name} className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 z-10 shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white mb-2">{business.name}</h2>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <p className="text-gray-700 max-w-3xl text-lg">{business.description}</p>
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-orange-600 hover:text-orange-800 ml-4 font-medium"
            >
              <Globe className="w-5 h-5 mr-2" />
              Visit Website 
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h3 className="text-xl font-semibold text-black mb-6 pb-2 border-b border-orange-200">
                About the Founder
              </h3>
              <div className="flex items-center mb-6">
                <img
                  src={business.founder.image}
                  alt={business.founder.name}
                  className="w-20 h-20 rounded-full object-cover mr-5 border-2 border-orange-300 shadow-md"
                />
                <div>
                  <h4 className="text-lg font-medium text-black">{business.founder.name}</h4>
                  <p className="text-gray-600">{business.founder.role}</p>
                  <div className="flex space-x-3 mt-3">
                    <a
                      href={`mailto:${business.founder.email}`}
                      className="text-gray-600 hover:text-orange-600 p-2 bg-white rounded-full shadow-sm"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={business.founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 p-2 bg-white rounded-full shadow-sm"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-800">
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-300">
                Key Achievements
              </h3>
              <ul className="space-y-4">
                {business.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center">
                    <Award className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShowcaseModal;