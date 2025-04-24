import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BookOpen } from 'lucide-react';

const QuickLinks = () => {
  const links = [
    {
      title: 'Events',
      icon: Calendar,
      description: 'Browse upcoming workshops and conferences',
      href: '#events',
    },
    {
      title: 'Leadership',
      icon: Users,
      description: 'Meet our committee members',
      href: '#leadership',
    },
    {
      title: 'Membership',
      icon: BookOpen,
      description: 'Join our community of entrepreneurs',
      href: '#membership',
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {links.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group border border-orange-100"
            >
              <div className="flex items-center">
                <link.icon className="h-8 w-8 text-orange-600" />
                <h3 className="ml-3 text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {link.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-600">{link.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;