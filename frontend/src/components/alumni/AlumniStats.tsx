import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
}

interface AlumniStatsProps {
  stats: Stat[];
}

const AlumniStats: React.FC<AlumniStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 text-center border border-orange-100"
        >
          <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
          <div className="text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default AlumniStats;