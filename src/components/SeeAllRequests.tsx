
import React, { useState } from 'react';
import { MessageSquare, Clock, User, CheckCircle, Circle, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Request {
  id: string;
  requesterName: string;
  requesterEmail: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'responded';
  category: string;
}

const SeeAllRequests = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      requesterName: 'Sarah Johnson',
      requesterEmail: 'sarah.j@example.com',
      message: 'Please pray for my family during this difficult time. My father is in the hospital and we need strength and healing.',
      date: '2024-01-15',
      status: 'unread',
      category: 'Prayer Request'
    },
    {
      id: '2',
      requesterName: 'Michael Chen',
      requesterEmail: 'michael.chen@example.com',
      message: 'I would like to know more about baptism and what it means in our faith. Can someone guide me through this?',
      date: '2024-01-14',
      status: 'read',
      category: 'Spiritual Guidance'
    },
    {
      id: '3',
      requesterName: 'Emma Davis',
      requesterEmail: 'emma.davis@example.com',
      message: 'Thank you for the wonderful sermon last Sunday. It really spoke to my heart and helped me through a tough week.',
      date: '2024-01-13',
      status: 'responded',
      category: 'Feedback'
    },
    {
      id: '4',
      requesterName: 'James Wilson',
      requesterEmail: 'james.w@example.com',
      message: 'I am struggling with doubt and would appreciate counseling or someone to talk to about my faith journey.',
      date: '2024-01-12',
      status: 'unread',
      category: 'Counseling'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'responded'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'text-brand-warning';
      case 'read': return 'text-brand-gold';
      case 'responded': return 'text-brand-success';
      default: return 'text-brand-brown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Circle className="h-4 w-4" />;
      case 'read': return <Clock className="h-4 w-4" />;
      case 'responded': return <CheckCircle className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const updateStatus = (id: string, newStatus: 'read' | 'responded') => {
    setRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const getStatusCounts = () => {
    return {
      unread: requests.filter(r => r.status === 'unread').length,
      read: requests.filter(r => r.status === 'read').length,
      responded: requests.filter(r => r.status === 'responded').length
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-brown mb-2">Prayer Requests & Messages</h1>
        <p className="text-brand-brown/70">Manage spiritual guidance requests from your community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-brand-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-brown/60">Total Requests</p>
                <p className="text-2xl font-bold text-brand-brown">{requests.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-brand-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-brand-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-brown/60">Unread</p>
                <p className="text-2xl font-bold text-brand-warning">{counts.unread}</p>
              </div>
              <Circle className="h-8 w-8 text-brand-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-brand-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-brown/60">Read</p>
                <p className="text-2xl font-bold text-brand-gold">{counts.read}</p>
              </div>
              <Clock className="h-8 w-8 text-brand-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-brand-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-brown/60">Responded</p>
                <p className="text-2xl font-bold text-brand-success">{counts.responded}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-brand-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {(['all', 'unread', 'read', 'responded'] as const).map(status => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status === 'all' ? 'All Requests' : status}
          </Button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <Card key={request.id} className="bg-white border-brand-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="text-sm font-medium capitalize">{request.status}</span>
                  </div>
                  <span className="text-xs bg-brand-beige text-brand-brown px-2 py-1 rounded">
                    {request.category}
                  </span>
                </div>
                <span className="text-sm text-brand-brown/60">{request.date}</span>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-brand-gold" />
                  <span className="font-medium text-brand-brown">{request.requesterName}</span>
                  <Mail className="h-4 w-4 text-brand-brown/40" />
                  <span className="text-sm text-brand-brown/60">{request.requesterEmail}</span>
                </div>
                <p className="text-brand-brown/80 leading-relaxed">{request.message}</p>
              </div>

              <div className="flex gap-2">
                {request.status === 'unread' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(request.id, 'read')}
                  >
                    Mark as Read
                  </Button>
                )}
                {(request.status === 'unread' || request.status === 'read') && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(request.id, 'responded')}
                  >
                    Mark as Responded
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="bg-white border-brand-border">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-brand-brown/30 mx-auto mb-4" />
            <p className="text-brand-brown/60">No requests found for the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeeAllRequests;
