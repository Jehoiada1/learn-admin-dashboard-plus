
import React, { useState } from 'react';
import { 
  Upload, 
  BookOpen, 
  Users, 
  Menu, 
  X, 
  Home,
  Settings,
  LogOut,
  Shield,
  FileText,
  Video,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const AdminLayout = ({ children, currentPage, onPageChange }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Study', icon: Upload },
    { id: 'upload-devotion', label: 'Upload Devotion', icon: FileText },
    { id: 'upload-sermon', label: 'Upload Sermon', icon: Video },
    { id: 'manage', label: 'Manage Studies', icon: BookOpen },
    { id: 'progress', label: 'User Progress', icon: Users },
    { id: 'requests', label: 'Prayer Requests', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-brand-beige shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-brand-border
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-brand-border">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-brand-gold" />
            <span className="text-xl font-bold text-brand-brown">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-brand-brown hover:text-brand-gold hover:bg-brand-soft-gold/20"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-brand-gold text-white shadow-md' 
                      : 'text-brand-brown hover:bg-brand-soft-gold/30 hover:text-brand-brown'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-brand-gold'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-brand-brown hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-brand-border lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="text-brand-brown hover:text-brand-gold hover:bg-brand-soft-gold/20"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <span className="text-lg font-semibold text-brand-brown">Admin Panel</span>
            <div className="w-10" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-brand-cream">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
