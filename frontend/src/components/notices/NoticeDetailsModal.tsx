import { motion } from "framer-motion";
import { Calendar, ChevronLeft, Download, Tag, X } from "lucide-react";
import React from "react";
import { Notice } from "./noticesService";

interface NoticeDetailsModalProps {
  notice: Notice;
  onClose: () => void;
}

const NoticeDetailsModal: React.FC<NoticeDetailsModalProps> = ({ notice, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Image Section - Takes full width on mobile, left sidebar on desktop */}
        {notice.image && (
          <div className="md:w-2/5 relative h-56 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-black/40 md:via-transparent md:to-transparent" />
            <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />

            {/* Mobile Category Badge */}
            <div className="absolute top-4 left-4 md:hidden">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-orange-500/90 text-white backdrop-blur-sm">
                {notice.category}
              </span>
            </div>

            {/* Go back button - mobile only */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white rounded-full p-2 md:hidden transition-all"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content Section */}
        <div className={`flex-1 flex flex-col ${notice.image ? "" : "h-full"} overflow-hidden`}>
          {/* Header with the outstanding title style from the second component */}
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <div className="flex space-x-3 items-center">
              <div className="h-10 w-1 bg-orange-500 rounded-full"></div>
              <h2 className="font-bold text-xl text-gray-900 line-clamp-2">{notice.title}</h2>
            </div>

            {/* Close button - visible on all screen sizes */}
            <button
              onClick={onClose}
              className="rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Metadata row */}
          <div className="px-5 py-3 flex flex-wrap gap-4 border-b border-gray-100 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-orange-500" />
              {notice.date}
            </div>

            <div className="flex items-center">
              <Tag size={16} className="mr-2 text-orange-500" />
              <span className="capitalize">{notice.category}</span>
            </div>
          </div>

          {/* Main content - scrollable */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6">
            {/* Content paragraphs */}
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">{notice.content}</div>

            {/* Attachments */}
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                    <Download size={14} className="text-orange-500" />
                  </span>
                  Attachments
                </h3>
                <div className="space-y-2">
                  {notice.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
                    >
                      <div className="bg-orange-100 text-orange-500 rounded-lg p-2 mr-3 group-hover:bg-orange-200 transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors">
                          {attachment.name}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 text-orange-500 transition-opacity">
                        <ChevronLeft size={16} className="rotate-180" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoticeDetailsModal;
