import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MembershipBenefits from '../components/membership/MembershipBenefits';
import MembershipPlan from '../components/membership/MembershipPlan';
import RegistrationForm from '../components/membership/RegistrationForm';
import { registerMember, getMembershipBenefits, getMembershipPlan } from '../components/membership/membershipService';

const Membership = () => {
  const [benefits, setBenefits] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [benefitsList, planData] = await Promise.all([
          getMembershipBenefits(),
          getMembershipPlan()
        ]);
        setBenefits(benefitsList);
        setPlan(planData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  const handleRegistration = async (data) => {
    try {
      await registerMember(data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">University Student Membership</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community designed exclusively for students of our university to expand your horizons
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        ) : (
          <>
            <MembershipBenefits benefits={benefits} />
            <MembershipPlan plan={plan} />
            <RegistrationForm onSubmit={handleRegistration} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-gray-600 mb-4">
                Have questions about student membership?
              </p>
              <button className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
                Contact our support team
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Membership;