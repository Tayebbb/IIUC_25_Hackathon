/**
 * Admin Dashboard
 * Main admin dashboard page with overview and statistics
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import AdminLayout from '../components/AdminLayout';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalUsers: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Count jobs
      const jobsRef = collection(db, 'jobs');
      const jobsSnapshot = await getDocs(jobsRef);
      const totalJobs = jobsSnapshot.size;

      // Count users
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const totalUsers = usersSnapshot.size;

      // Count applications (you can add this based on your data structure)
      const applicationsRef = collection(db, 'applications');
      const applicationsSnapshot = await getDocs(applicationsRef);
      const pendingApplications = applicationsSnapshot.size;

      setStats({
        totalJobs,
        totalUsers,
        pendingApplications,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="neon-card p-6 rounded-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold glow-text">{value}</p>
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 md:p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold glow-text mb-2">Admin Dashboard</h1>
          <p className="text-muted">Welcome back! Here's your platform overview.</p>
        </div>

        {/* Statistics Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={Briefcase}
              label="Total Jobs"
              value={stats.totalJobs}
              color="#A855F7"
            />
            <StatCard
              icon={Users}
              label="Total Users"
              value={stats.totalUsers}
              color="#D500F9"
            />
            <StatCard
              icon={TrendingUp}
              label="Applications"
              value={stats.pendingApplications}
              color="#06B6D4"
            />
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neon-card p-6 rounded-xl"
        >
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-lg text-left transition-all duration-200"
              style={{
                background: 'linear-gradient(90deg,#A855F7,#D500F9)',
                boxShadow: '0 0 20px rgba(168,85,247,0.3)',
              }}
            >
              <Briefcase size={24} className="text-white mb-2" />
              <p className="font-semibold text-white">Manage Jobs</p>
              <p className="text-sm text-white/80">Create and edit job postings</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-lg text-left transition-all duration-200 border border-[rgba(168,85,247,0.3)]"
              style={{
                background: 'rgba(168,85,247,0.06)',
              }}
            >
              <BarChart3 size={24} className="text-primary mb-2" />
              <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                View Analytics
              </p>
              <p className="text-sm text-muted">Platform statistics and insights</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Information Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 rounded-lg flex items-start space-x-4"
          style={{
            background: 'rgba(59,130,246,0.06)',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-400">Admin Access Active</p>
            <p className="text-sm text-muted mt-1">
              You have full access to the platform management features. Use the sidebar to navigate between different admin tools.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
