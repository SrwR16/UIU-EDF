import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ShowcaseCard from './ShowcaseCard';
import { Business } from './showcaseService';

interface ShowcaseGridProps {
  businesses: Business[];
  onSelectBusiness: (business: Business) => void;
}

const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({
  businesses,
  onSelectBusiness
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {businesses.map((business, index) => (
        <ShowcaseCard
          key={business.id}
          business={business}
          index={index}
          inView={inView}
          onSelect={onSelectBusiness}
        />
      ))}
      
      {businesses.length === 0 && (
        <div className="col-span-3 text-center py-16">
          <p className="text-xl text-gray-600">No ventures found. Try different search terms.</p>
        </div>
      )}
    </div>
  );
};

export default ShowcaseGrid;