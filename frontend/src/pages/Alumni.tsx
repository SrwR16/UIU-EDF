import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AlumniFilters from '../components/alumni/AlumniFilters';
import AlumniGrid from '../components/alumni/AlumniGrid';
import AlumniStats from '../components/alumni/AlumniStats';
import { Alumni, getIndustries, getAlumni, getAlumniStats } from '../components/alumni/alumniService';

const AlumniPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [industries, setIndustries] = useState([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [industriesList, alumniStats] = await Promise.all([
          getIndustries(),
          getAlumniStats()
        ]);
        setIndustries(industriesList);
        setStats(alumniStats);
        await fetchAlumni('all');
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchAlumni(selectedIndustry);
  }, [selectedIndustry]);

  const fetchAlumni = async (industryId: string) => {
    setLoading(true);
    try {
      const data = await getAlumni(industryId);
      setAlumni(data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter(person => {
    return person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           person.role.toLowerCase().includes(searchTerm.toLowerCase());
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Alumni Network</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the success stories of our graduates and their impact across industries worldwide
          </p>
        </motion.div>

        <AlumniStats stats={stats} />

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
            <AlumniFilters
              industries={industries}
              selectedIndustry={selectedIndustry}
              searchTerm={searchTerm}
              setSelectedIndustry={setSelectedIndustry}
              setSearchTerm={setSearchTerm}
            />
            
            <AlumniGrid alumni={filteredAlumni} />
          </>
        )}
      </div>
    </div>
  );
};

export default AlumniPage;