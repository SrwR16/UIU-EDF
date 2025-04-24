import { motion } from "framer-motion";
import { Bell, Calendar, ChevronRight, Tag } from "lucide-react";
import React from "react";
import { Notice } from "./noticesService";

interface NoticeCardProps {
  notice: Notice;
  index: number;
  onViewDetails: (notice: Notice) => void;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, index, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Bell className="w-5 h-5 mr-2 text-orange-500" />
              <h2 className="text-2xl font-semibold text-gray-900">{notice.title}</h2>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {notice.date}
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-1 text-orange-400" />
                <span className="text-gray-500 capitalize">{notice.category}</span>
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{notice.content}</p>

        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {notice.attachments && notice.attachments.length > 0 ? (
              <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments: {notice.attachments.length}</h3>
            ) : (
              <h3 className="text-sm font-medium text-gray-900 mb-2">No Attachments</h3>
            )}
          </div>
          <button
            onClick={() => onViewDetails(notice)}
            className="inline-flex items-center text-orange-600 hover:text-orange-800"
          >
            Read More <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
