import { motion } from "framer-motion";
import { Calendar, Download, Tag, X } from "lucide-react";
import React from "react";
import { Notice } from "./noticesService";

interface NoticeDetailsModalProps {
  notice: Notice;
  onClose: () => void;
}

const NoticeDetailsModal: React.FC<NoticeDetailsModalProps> = ({ notice, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          {notice.image && (
            <img src={notice.image} alt={notice.title} className="w-full h-72 object-cover rounded-t-xl" />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 z-10 shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{notice.title}</h2>
          <div className="flex items-center space-x-4 text-sm mb-6">
            <span className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {notice.date}
            </span>
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-1 text-gray-400" />
              <span className="text-gray-500 capitalize">{notice.category}</span>
            </span>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 whitespace-pre-line">{notice.content}</p>
          </div>

          {notice.attachments && notice.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
              <div className="space-y-2">
                {notice.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-600 hover:text-orange-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {attachment.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NoticeDetailsModal;
