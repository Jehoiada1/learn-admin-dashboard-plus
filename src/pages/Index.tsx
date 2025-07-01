
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../components/Dashboard';
import UploadStudy from '../components/UploadStudy';
import UploadDevotion from '../components/UploadDevotion';
import UploadSermon from '../components/UploadSermon';
import ManageStudies from '../components/ManageStudies';
import UserProgress from '../components/UserProgress';
import SeeAllRequests from '../components/SeeAllRequests';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'upload':
        return <UploadStudy />;
      case 'upload-devotion':
        return <UploadDevotion />;
      case 'upload-sermon':
        return <UploadSermon />;
      case 'manage':
        return <ManageStudies />;
      case 'progress':
        return <UserProgress />;
      case 'requests':
        return <SeeAllRequests />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-brand-brown mb-4">Settings</h1>
            <p className="text-brand-brown/60">Admin settings and configuration options coming soon...</p>
          </div>
        );
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
};

export default Index;
