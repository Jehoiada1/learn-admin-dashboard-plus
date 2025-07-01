
import React, { useState } from 'react';
import { Search, Download, Filter, TrendingUp, Users, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface UserProgress {
  id: string;
  username: string;
  email: string;
  studyName: string;
  chaptersCompleted: number;
  totalChapters: number;
  percentageComplete: number;
  lastActivity: string;
  enrolledDate: string;
  timeSpent: string;
}

const UserProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStudy, setFilterStudy] = useState('all');

  const progressData = [
    {
      id: '1',
      username: 'John Doe',
      email: 'john@example.com',
      studyName: 'Advanced React Patterns',
      chaptersCompleted: 8,
      totalChapters: 12,
      percentageComplete: 67,
      lastActivity: '2 hours ago',
      enrolledDate: '2024-01-15',
      timeSpent: '24h 30m'
    },
    {
      id: '2',
      username: 'Sarah Wilson',
      email: 'sarah@example.com',
      studyName: 'TypeScript Fundamentals',
      chaptersCompleted: 6,
      totalChapters: 8,
      percentageComplete: 75,
      lastActivity: '1 day ago',
      enrolledDate: '2024-01-12',
      timeSpent: '18h 45m'
    },
    {
      id: '3',
      username: 'Mike Johnson',
      email: 'mike@example.com',
      studyName: 'Node.js Backend Development',
      chaptersCompleted: 15,
      totalChapters: 15,
      percentageComplete: 100,
      lastActivity: '3 hours ago',
      enrolledDate: '2024-01-10',
      timeSpent: '42h 15m'
    },
    {
      id: '4',
      username: 'Emma Davis',
      email: 'emma@example.com',
      studyName: 'CSS Grid and Flexbox Mastery',
      chaptersCompleted: 4,
      totalChapters: 6,
      percentageComplete: 67,
      lastActivity: '5 hours ago',
      enrolledDate: '2024-01-18',
      timeSpent: '12h 20m'
    },
    {
      id: '5',
      username: 'Alex Chen',
      email: 'alex@example.com',
      studyName: 'Advanced React Patterns',
      chaptersCompleted: 12,
      totalChapters: 12,
      percentageComplete: 100,
      lastActivity: '1 hour ago',
      enrolledDate: '2024-01-05',
      timeSpent: '38h 50m'
    }
  ];

  const studies = ['All Studies', 'Advanced React Patterns', 'TypeScript Fundamentals', 'Node.js Backend Development', 'CSS Grid and Flexbox Mastery'];

  const filteredData = progressData.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.studyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStudy = filterStudy === 'all' || filterStudy === 'All Studies' || user.studyName === filterStudy;
    
    return matchesSearch && matchesStudy;
  });

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-700';
    if (percentage >= 75) return 'text-blue-700';
    if (percentage >= 50) return 'text-yellow-700';
    return 'text-red-700';
  };

  // Summary stats
  const totalUsers = progressData.length;
  const completedUsers = progressData.filter(user => user.percentageComplete === 100).length;
  const averageProgress = Math.round(progressData.reduce((sum, user) => sum + user.percentageComplete, 0) / totalUsers);
  const activeUsers = progressData.filter(user => user.lastActivity.includes('hour')).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Progress</h1>
        <p className="text-gray-600">Track student progress and performance across all studies.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-gray-600 text-sm">Total Users</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedUsers}</p>
              <p className="text-gray-600 text-sm">Completed Studies</p>
            </div>
            <Award className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
              <p className="text-gray-600 text-sm">Average Progress</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              <p className="text-gray-600 text-sm">Active Today</p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users or studies..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterStudy}
            onChange={(e) => setFilterStudy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {studies.map(study => (
              <option key={study} value={study === 'All Studies' ? 'all' : study}>{study}</option>
            ))}
          </select>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>

      {/* Progress Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Study</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Progress</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Chapters</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Time Spent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{user.username}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{user.studyName}</div>
                    <div className="text-sm text-gray-500">Enrolled {user.enrolledDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(user.percentageComplete)}`}
                          style={{ width: `${user.percentageComplete}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getProgressTextColor(user.percentageComplete)}`}>
                        {user.percentageComplete}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">
                      {user.chaptersCompleted}/{user.totalChapters}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{user.timeSpent}</td>
                  <td className="py-4 px-6 text-gray-500">{user.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No user progress data found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserProgress;
