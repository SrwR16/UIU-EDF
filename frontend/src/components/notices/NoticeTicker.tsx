import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotices, Notice } from "./noticesService";

const NoticeTicker = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const fetchedNotices = await getNotices();
      setNotices(fetchedNotices.slice(0, 3));
    };

    fetchNotices();
  }, []);

  return (
    <div className="bg-blue-100 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-blue-900">Latest Updates:</span>
          <div className="overflow-hidden relative flex-1">
            <div className="animate-ticker whitespace-nowrap">
              {notices.map((notice, index) => (
                <span key={index} className="inline-block mx-4">
                  <Link
                    to={`/notices/${notice.id}`}
                    state={{ from: "homepage" }}
                    className="text-orange-600 hover:text-orange-800 truncate"
                  >
                    {notice.title}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;
