import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy } from 'lucide-react';

interface Benefit {
  icon: typeof Users;
  title: string;
  description: string;
}

interface MembershipBenefitsProps {
  benefits: Benefit[];
}

const MembershipBenefits: React.FC<MembershipBenefitsProps> = ({ benefits }) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center border border-orange-100"
        >
          <benefit.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MembershipBenefits;