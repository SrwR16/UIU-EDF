import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShowcaseFilters from '../components/showcase/ShowcaseFilters';
import ShowcaseGrid from '../components/showcase/ShowcaseGrid';
import ShowcaseModal from '../components/showcase/ShowcaseModal';
import { Business, getCategories, getBusinesses } from '../components/showcase/showcaseService';

const Showcase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const categoriesList = await getCategories();
        setCategories(categoriesList);
        await fetchBusinesses('all');
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchBusinesses(selectedCategory);
  }, [selectedCategory]);

  const fetchBusinesses = async (categoryId: string) => {
    setLoading(true);
    try {
      const data = await getBusinesses(categoryId);
      setBusinesses(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    return business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           business.description.toLowerCase().includes(searchQuery.toLowerCase());
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
          <h1 className="text-5xl font-bold text-black mb-4">Student Ventures</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover innovative businesses from our student entrepreneurs
          </p>
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
            <ShowcaseFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              setSelectedCategory={setSelectedCategory}
              setSearchQuery={setSearchQuery}
            />
            
            <ShowcaseGrid
              businesses={filteredBusinesses}
              onSelectBusiness={setSelectedBusiness}
            />
          </>
        )}

        {selectedBusiness && (
          <ShowcaseModal
            business={selectedBusiness}
            onClose={() => setSelectedBusiness(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Showcase;