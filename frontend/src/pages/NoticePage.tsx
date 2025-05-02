import { Calendar, ChevronLeft, Download, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Notice, getNoticeById } from "../components/notices/noticesService";
import RecentNoticesPanel from "../components/notices/RecentNoticesPanel";

const NoticePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user came from homepage
  const fromHomePage = location.state?.from === "homepage";
  // Check if this is a direct navigation (not from another notice)
  const fromNotice = location.state?.from === "notice";

  useEffect(() => {
    const fetchNotice = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const noticeData = await getNoticeById(id);
        setNotice(noticeData);
      } catch (err) {
        console.error("Error fetching notice:", err);
        setError("Failed to load notice. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  const handleGoBack = () => {
    // If we know the user came from homepage, go there directly
    if (fromHomePage) {
      navigate("/");
    }
    // If we came from another notice or recent notices link, go to notices listing
    else if (fromNotice) {
      navigate("/notices");
    }
    // Otherwise go back in history
    else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-orange-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Notice not found"}</h2>
          <p className="text-gray-600 mb-6">We couldn't find the notice you're looking for.</p>
          <Link
            to="/notices"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Notices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button - updated to use our custom handler */}
        <button
          onClick={handleGoBack}
          className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {fromHomePage ? "Back to homepage" : "Back"}
        </button>

        {/* Main notice card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-12">
          {/* Category indicator - make it thicker */}
          <div className={`h-2 w-full bg-orange-500`} />

          <div className="p-6 md:p-8">
            {/* Enhanced title styling */}
            <div className="border-b border-orange-200 pb-4 mb-6">
              <h1 className="text-3xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                <span className="inline-block border-l-4 border-orange-500 pl-3">{notice.title}</span>
              </h1>
            </div>

            {/* Metadata row */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-orange-500" />
                {notice.date}
              </div>

              <div className="flex items-center">
                <Tag size={16} className="mr-2 text-orange-500" />
                <span className="capitalize">{notice.category}</span>
              </div>
            </div>

            {/* Image if available */}
            {notice.image && (
              <div className="mb-6">
                <img src={notice.image} alt={notice.title} className="w-full h-auto rounded-lg object-cover max-h-96" />
              </div>
            )}

            {/* Content */}
            <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-8">{notice.content}</div>

            {/* Attachments */}
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Attachments</h3>
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
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent notices section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Notices</h2>
          <RecentNoticesPanel excludeId={id} limit={3} />
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
