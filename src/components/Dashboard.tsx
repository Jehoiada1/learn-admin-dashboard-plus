
import React from 'react';
import { BookOpen, Users, Upload, TrendingUp, Activity, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Studies',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '1,847',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Studies Uploaded',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: Upload,
      color: 'purple'
    },
    {
      title: 'Completion Rate',
      value: '73%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Completed', study: 'Advanced React Patterns', time: '2 hours ago' },
    { user: 'Sarah Wilson', action: 'Started', study: 'TypeScript Fundamentals', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Uploaded', study: 'New Node.js Course', time: '6 hours ago' },
    { user: 'Emma Davis', action: 'Completed', study: 'CSS Grid Mastery', time: '1 day ago' },
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your studies.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user} {activity.action.toLowerCase()} "{activity.study}"
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
            <Eye className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <Upload className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                <div>
                  <p className="font-medium text-gray-900">Upload New Study</p>
                  <p className="text-sm text-gray-500">Add a new course or study material</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                <div>
                  <p className="font-medium text-gray-900">Manage Studies</p>
                  <p className="text-sm text-gray-500">Edit, lock, or delete existing studies</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                <div>
                  <p className="font-medium text-gray-900">View User Progress</p>
                  <p className="text-sm text-gray-500">Track student completion and performance</p>
                </div>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
