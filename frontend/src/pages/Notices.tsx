import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NoticeDetailsModal from "../components/notices/NoticeDetailsModal";
import NoticesFilters from "../components/notices/NoticesFilters";
import NoticesGrid from "../components/notices/NoticesGrid";
import { Category, Notice, getCategories, getNotices } from "../components/notices/noticesService";

const Notices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  // Load categories first
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getCategories();
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch notices whenever category changes
  useEffect(() => {
    const fetchNoticesByCategory = async () => {
      setLoading(true);
      try {
        const data = await getNotices(selectedCategory);
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticesByCategory();
  }, [selectedCategory]);

  const filteredNotices = notices.filter((notice) => {
    if (!searchTerm) return true;
    return (
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Notices & Announcements</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest news and important announcements</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        ) : (
          <>
            <NoticesFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              setSelectedCategory={setSelectedCategory}
              setSearchTerm={setSearchTerm}
            />

            <NoticesGrid notices={filteredNotices} onViewDetails={setSelectedNotice} />
          </>
        )}

        {selectedNotice && <NoticeDetailsModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />}
      </div>
    </div>
  );
};

export default Notices;
