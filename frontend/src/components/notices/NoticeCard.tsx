import { motion } from "framer-motion";
import { Calendar, ChevronRight, FileText, Tag } from "lucide-react";
import React from "react";

// Import from the correct path based on your original code
import { Notice } from "./noticesService"; // Correct the import path

interface NoticeCardProps {
  notice: Notice;
  index: number;
  onViewDetails: (notice: Notice) => void;
}

interface Attachment {
  name: string;
  url: string;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, index, onViewDetails }) => {
  // Generate consistent category colors based on category string
  const getCategoryColor = (category: string) => {
    // This generates a consistent color based on the string
    const categoryHash = Array.from(category.toLowerCase()).reduce(
      (hash, char) => char.charCodeAt(0) + ((hash << 5) - hash),
      0
    );

    const colorOptions = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-red-100 text-red-800",
      "bg-yellow-100 text-yellow-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-indigo-100 text-indigo-800",
      "bg-pink-100 text-pink-800",
    ];

    return colorOptions[Math.abs(categoryHash) % colorOptions.length];
  };

  // Generate a consistent accent color based on category for the banner
  const getCategoryAccentColor = (category: string) => {
    const baseColor = getCategoryColor(category).split(" ")[0];
    return baseColor.replace("100", "500");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image section (if available) */}
        {notice.image && (
          <div className="md:w-1/3 h-48 md:h-auto">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${notice.image})`,
              }}
            />
          </div>
        )}

        {/* Content section */}
        <div className={`flex-1 flex flex-col ${notice.image ? "md:border-l border-gray-100" : ""}`}>
          {/* Category indicator */}
          <div className={`h-1 w-full ${getCategoryAccentColor(notice.category)}`} />

          <div className="p-5 flex-1 flex flex-col">
            {/* Header */}
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{notice.title}</h2>
              <div className="flex items-center space-x-3 flex-wrap">
                <span className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {notice.date}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                    notice.category
                  )}`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {notice.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-600 mb-4 flex-grow line-clamp-3 text-sm">{notice.content}</p>

            {/* Attachments */}
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h3>
                <div className="space-y-1">
                  {notice.attachments.slice(0, 2).map((attachment: Attachment, idx: number) => (
                    <div key={idx} className="flex items-center text-sm">
                      <FileText className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600 truncate">{attachment.name}</span>
                    </div>
                  ))}
                  {notice.attachments.length > 2 && (
                    <div className="text-sm text-gray-500">+{notice.attachments.length - 2} more</div>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end mt-auto pt-3 border-t border-gray-100">
              <button
                onClick={() => onViewDetails(notice)}
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-sm font-medium"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
