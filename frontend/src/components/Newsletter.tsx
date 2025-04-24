import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
  };

  return (
    <div className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with UEDF
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest events and opportunities
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Subscribe
              </button>
            </div>
            {status === 'success' && (
              <p className="mt-4 text-green-400">
                Thank you for subscribing to our newsletter!
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-400">
                An error occurred. Please try again later.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;