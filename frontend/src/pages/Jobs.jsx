import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, Building2, Clock, TrendingUp, X, ExternalLink } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8za3ZI4m9gUrYsueUum907vpuKzV8H0Q",
  authDomain: "iiuc25.firebaseapp.com",
  projectId: "iiuc25",
  storageBucket: "iiuc25.firebasestorage.app",
  messagingSenderId: "75690391713",
  appId: "1:75690391713:web:4c72c5316547c8bc68d8e0",
  measurementId: "G-82V42TWJ9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs from Firebase
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const jobsRef = collection(db, 'Jobs');
        const snapshot = await getDocs(jobsRef);
        
        const jobsData = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          jobsData.push({
            id: doc.id,
            title: doc.id, // Document name is the job title
            details: data['Job Details'] || data.JobDetails || 'No details available',
            salary: data.Salary || 'Not specified',
            company: data['Company Name'] || data.CompanyName || 'Company not specified',
          });
        });

        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  // Format salary for display
  const formatSalary = (salary) => {
    if (!salary || salary === 'Not specified') return salary;
    // Add thousand separators if it's a number
    const numericSalary = salary.toString().replace(/\D/g, '');
    if (numericSalary) {
      return `৳${parseInt(numericSalary).toLocaleString('en-BD')}`;
    }
    return salary;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <Briefcase size={64} className="mx-auto opacity-90" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover exciting career opportunities that match your skills and aspirations
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
              </div>
              {searchTerm && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Clear
                </motion.button>
              )}
            </div>
            
            {/* Stats */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <TrendingUp size={16} />
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </span>
              {searchTerm && (
                <span className="text-blue-600">
                  Searching for "{searchTerm}"
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Briefcase size={48} className="text-blue-600" />
            </motion.div>
            <p className="mt-4 text-gray-600 text-lg">Loading amazing opportunities...</p>
          </div>
        ) : (
          <>
            {/* Jobs Grid */}
            <AnimatePresence mode="wait">
              {filteredJobs.length > 0 ? (
                <motion.div 
                  key="jobs-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
                      onClick={() => setSelectedJob(job)}
                    >
                      {/* Card Header with Gradient */}
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      
                      <div className="p-6">
                        {/* Company Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                            <Building2 className="text-blue-600" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                              {job.company}
                            </h4>
                            <p className="text-xs text-gray-500">Company</p>
                          </div>
                        </div>

                        {/* Job Title */}
                        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>

                        {/* Job Details Preview */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {job.details}
                        </p>

                        {/* Salary */}
                        <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-xl">
                          <DollarSign className="text-green-600" size={20} />
                          <div>
                            <p className="text-xs text-gray-600">Salary</p>
                            <p className="font-bold text-green-700">
                              {formatSalary(job.salary)}
                            </p>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2 group-hover:shadow-lg">
                          View Details
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-20"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                    <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any jobs matching "{searchTerm}". Try adjusting your search.
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <Building2 size={28} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                        <p className="text-white/90 mt-1">{selectedJob.company}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Salary Highlight */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                      <DollarSign size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Salary Package</p>
                      <p className="text-3xl font-bold text-green-700">
                        {formatSalary(selectedJob.salary)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Job Details Section */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={24} />
                    Job Details
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedJob.details}
                    </p>
                  </div>
                </div>

                {/* Company Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Building2 className="text-purple-600" size={24} />
                    About Company
                  </h3>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <p className="text-xl font-semibold text-purple-900">
                      {selectedJob.company}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobs;