import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Notice, getNotices } from "./noticesService";

interface RecentNoticesPanelProps {
  excludeId?: string;
  limit?: number;
}

const RecentNoticesPanel: React.FC<RecentNoticesPanelProps> = ({ excludeId, limit = 3 }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentNotices = async () => {
      try {
        setLoading(true);
        const allNotices = await getNotices();
        let filteredNotices = allNotices;

        if (excludeId) {
          filteredNotices = allNotices.filter((notice) => notice.id !== excludeId);
        }

        setNotices(filteredNotices.slice(0, limit));
      } catch (error) {
        console.error("Error fetching recent notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNotices();
  }, [excludeId, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-5 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {notices.map((notice) => (
        <Link key={notice.id} to={`/notices/${notice.id}`} className="block">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 h-full">
            {/* Category indicator */}
            <div className="h-1 w-full bg-orange-500" />

            <div className="p-5 flex flex-col h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{notice.title}</h3>

              <div className="flex items-center space-x-3 mb-3">
                <span className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {notice.date}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{notice.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentNoticesPanel;
