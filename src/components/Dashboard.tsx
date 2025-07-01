
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
      color: 'gold'
    },
    {
      title: 'Active Users',
      value: '1,847',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'success'
    },
    {
      title: 'Studies Uploaded',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: Upload,
      color: 'brown'
    },
    {
      title: 'Completion Rate',
      value: '73%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'warning'
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
      gold: 'bg-brand-gold',
      success: 'bg-brand-success',
      brown: 'bg-brand-brown',
      warning: 'bg-brand-warning'
    };
    return colors[color as keyof typeof colors] || 'bg-brand-gold';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-brown mb-2">Dashboard Overview</h1>
        <p className="text-brand-brown/70">Welcome back! Here's what's happening with your studies.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 bg-white border-brand-border">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-brand-success bg-brand-success/10 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-brown mb-1">{stat.value}</p>
                <p className="text-brand-brown/60 text-sm">{stat.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6 bg-white border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-brand-brown">Recent Activity</h3>
            <Activity className="h-5 w-5 text-brand-gold" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-brand-beige/50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-soft-gold rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-brown truncate">
                    {activity.user} {activity.action.toLowerCase()} "{activity.study}"
                  </p>
                  <p className="text-xs text-brand-brown/60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-white border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-brand-brown">Quick Actions</h3>
            <Eye className="h-5 w-5 text-brand-gold" />
          </div>
          <div className="space-y-3">
            <button className="w-full p-4 text-left border border-brand-border rounded-lg hover:border-brand-gold hover:bg-brand-beige/30 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <Upload className="h-5 w-5 text-brand-gold group-hover:text-brand-gold" />
                <div>
                  <p className="font-medium text-brand-brown">Upload New Study</p>
                  <p className="text-sm text-brand-brown/60">Add a new course or study material</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left border border-brand-border rounded-lg hover:border-brand-success hover:bg-brand-success/5 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-brand-success group-hover:text-brand-success" />
                <div>
                  <p className="font-medium text-brand-brown">Manage Studies</p>
                  <p className="text-sm text-brand-brown/60">Edit, lock, or delete existing studies</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left border border-brand-border rounded-lg hover:border-brand-brown hover:bg-brand-brown/5 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-brand-brown group-hover:text-brand-brown" />
                <div>
                  <p className="font-medium text-brand-brown">View User Progress</p>
                  <p className="text-sm text-brand-brown/60">Track student completion and performance</p>
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
