import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  currency: string;
  period: string;
  features: string[];
}

interface MembershipPlanProps {
  plan: Plan;
}

const MembershipPlan: React.FC<MembershipPlanProps> = ({ plan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-500 mb-16"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
        Lifetime Access
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold text-gray-900">{plan.price} {plan.currency}</span>
        <span className="text-gray-500 ml-2">Valid Until Graduation</span>
      </div>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center text-gray-600">
            <Check className="w-5 h-5 text-orange-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MembershipPlan;