import React from 'react';

const NewsTicker = () => {
  const announcements = [
    'New workshop series starting next month',
    'Applications open for summer internship program',
    'Annual entrepreneurship conference registration now live',
    'Mentorship program accepting new mentors',
  ];

  return (
    <div className="bg-blue-100 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-blue-900">Latest Updates:</span>
          <div className="overflow-hidden relative flex-1">
            <div className="animate-ticker whitespace-nowrap">
              {announcements.map((announcement, index) => (
                <span key={index} className="inline-block mx-4">
                  {announcement}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;