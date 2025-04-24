import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Mail, Linkedin, Award, ExternalLink } from 'lucide-react';
import { Alumni } from './alumniService';

interface AlumniCardProps {
  alumni: Alumni;
  index: number;
  inView: boolean;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64">
        <img
          src={alumni.image}
          alt={alumni.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-1">{alumni.name}</h3>
          <p className="text-orange-200">Class of {alumni.graduation}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-5 h-5 text-orange-500 mr-2" />
            <span>{alumni.role} at {alumni.company}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 text-orange-500 mr-2" />
            <span>{alumni.location}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{alumni.success}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
          <ul className="space-y-2">
            {alumni.achievements.map((achievement, i) => (
              <li key={i} className="flex items-center text-gray-600">
                <Award className="w-4 h-4 text-orange-600 mr-2" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(alumni.stats).map(([key, value], i) => (
            <div key={i} className="text-center">
              <div className="font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-600">{key}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex space-x-4">
            <a href={`mailto:${alumni.email}`} className="text-gray-600 hover:text-orange-600 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href={alumni.linkedin} className="text-gray-600 hover:text-orange-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <a href={alumni.profileUrl} className="flex items-center text-orange-600 hover:text-orange-800 font-medium">
            View Profile <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCard;