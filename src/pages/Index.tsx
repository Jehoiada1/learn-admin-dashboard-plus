
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../components/Dashboard';
import UploadStudy from '../components/UploadStudy';
import ManageStudies from '../components/ManageStudies';
import UserProgress from '../components/UserProgress';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadStudy />;
      case 'manage':
        return <ManageStudies />;
      case 'progress':
        return <UserProgress />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Admin settings and configuration options coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
};

export default Index;
