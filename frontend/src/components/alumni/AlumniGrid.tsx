import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AlumniCard from './AlumniCard';
import { Alumni } from './alumniService';

interface AlumniGridProps {
  alumni: Alumni[];
}

const AlumniGrid: React.FC<AlumniGridProps> = ({ alumni }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {alumni.map((person, index) => (
        <AlumniCard
          key={person.id}
          alumni={person}
          index={index}
          inView={inView}
        />
      ))}
      
      {alumni.length === 0 && (
        <div className="col-span-3 text-center py-16">
          <p className="text-xl text-gray-600">No alumni found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AlumniGrid;