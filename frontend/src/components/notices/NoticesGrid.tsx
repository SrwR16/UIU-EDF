import React from 'react';
import { motion } from 'framer-motion';
import NoticeCard from './NoticeCard';
import { Notice } from './noticesService';

interface NoticesGridProps {
  notices: Notice[];
  onViewDetails: (notice: Notice) => void;
}

const NoticesGrid: React.FC<NoticesGridProps> = ({ notices, onViewDetails }) => {
  return (
    <div className="space-y-6">
      {notices.map((notice, index) => (
        <NoticeCard
          key={notice.id}
          notice={notice}
          index={index}
          onViewDetails={onViewDetails}
        />
      ))}
      
      {notices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No notices found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default NoticesGrid;