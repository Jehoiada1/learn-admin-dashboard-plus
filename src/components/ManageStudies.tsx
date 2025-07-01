
import React, { useState } from 'react';
import { 
  Search, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock, 
  Eye, 
  MoreVertical,
  BookOpen,
  Users,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Study {
  id: string;
  title: string;
  description: string;
  chapters: number;
  enrolledUsers: number;
  isLocked: boolean;
  createdAt: string;
  lastModified: string;
  status: 'published' | 'draft';
}

const ManageStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'locked'>('all');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const [studies, setStudies] = useState<Study[]>([
    {
      id: '1',
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts including hooks, context, and performance optimization.',
      chapters: 12,
      enrolledUsers: 234,
      isLocked: false,
      createdAt: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'published'
    },
    {
      id: '2',
      title: 'TypeScript Fundamentals',
      description: 'Learn TypeScript from basics to advanced type system features.',
      chapters: 8,
      enrolledUsers: 156,
      isLocked: true,
      createdAt: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'published'
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express.',
      chapters: 15,
      enrolledUsers: 89,
      isLocked: false,
      createdAt: '2024-01-12',
      lastModified: '2024-01-19',
      status: 'draft'
    },
    {
      id: '4',
      title: 'CSS Grid and Flexbox Mastery',
      description: 'Modern CSS layout techniques for responsive web design.',
      chapters: 6,
      enrolledUsers: 312,
      isLocked: false,
      createdAt: '2024-01-08',
      lastModified: '2024-01-16',
      status: 'published'
    }
  ]);

  const toggleLock = (studyId: string) => {
    setStudies(studies.map(study => 
      study.id === studyId ? { ...study, isLocked: !study.isLocked } : study
    ));
  };

  const deleteStudy = (studyId: string) => {
    setStudies(studies.filter(study => study.id !== studyId));
    setShowDeleteModal(null);
  };

  const filteredStudies = studies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'locked' && study.isLocked) ||
                         (filterStatus !== 'locked' && study.status === filterStatus);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string, isLocked: boolean) => {
    if (isLocked) return 'bg-red-100 text-red-800';
    if (status === 'published') return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (status: string, isLocked: boolean) => {
    if (isLocked) return 'Locked';
    if (status === 'published') return 'Published';
    return 'Draft';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Studies</h1>
        <p className="text-gray-600">Edit, organize, and control access to your study materials.</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search studies..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Studies</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Studies Grid */}
      <div className="grid gap-6">
        {filteredStudies.map((study) => (
          <Card key={study.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{study.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(study.status, study.isLocked)}`}>
                    {getStatusText(study.status, study.isLocked)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{study.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{study.chapters} chapters</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{study.enrolledUsers} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Modified {study.lastModified}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleLock(study.id)}
                  className={study.isLocked ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"}
                >
                  {study.isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDeleteModal(study.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No studies found matching your criteria.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Study</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this study? This action cannot be undone and will remove all associated chapters and pages.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => deleteStudy(showDeleteModal)}>
                Delete Study
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudies;
