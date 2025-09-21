import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const MyReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const myReports = [
    {
      id: 1,
      title: 'Oil spill at Marina Beach',
      type: 'Oil Spill',
      location: 'Marina Beach, Chennai',
      date: '2024-01-15',
      time: '2:30 PM',
      status: 'verified',
      description: 'Large oil spill observed near the lighthouse. Approximately 50m radius affected.',
      image: 'https://images.unsplash.com/photo-1698604832593-2984b65b5082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBzcGlsbCUyMG9jZWFuJTIwcG9sbHV0aW9ufGVufDF8fHx8MTc1Nzc3NzkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      title: 'Dead fish washing ashore',
      type: 'Dead Fish',
      location: 'Elliot Beach, Chennai',
      date: '2024-01-14',
      time: '9:15 AM',
      status: 'submitted',
      description: 'Multiple dead fish found along the shore. Species appears to be sardines.',
      image: 'https://images.unsplash.com/photo-1742304267116-70a23f211b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkJTIwZmlzaCUyMG1hcmluZSUyMGxpZmV8ZW58MXx8fHwxNzU3Nzc3OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      title: 'Unusual wave patterns',
      type: 'Storm',
      location: 'Mahabalipuram Beach',
      date: '2024-01-13',
      time: '6:45 PM',
      status: 'resolved',
      description: 'High waves with unusual foam patterns. Possible storm activity offshore.',
      image: 'https://images.unsplash.com/photo-1613408629165-d964ec4d8a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhvY2VhbiUyMHN0b3JtJTIwd2F2ZXMlMjBoYXphcmR8ZW58MXx8fHwxNzU3Nzc3OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      title: 'Coastal erosion noticed',
      type: 'Erosion',
      location: 'Kovalam Beach',
      date: '2024-01-12',
      time: '11:30 AM',
      status: 'submitted',
      description: 'Significant erosion along the northern section of the beach.',
      image: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'submitted':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = myReports.filter(report => {
    if (activeTab === 'all') return true;
    return report.status === activeTab;
  });

  const getTabCount = (status: string) => {
    if (status === 'all') return myReports.length;
    return myReports.filter(report => report.status === status).length;
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-[#053b50] text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="flex-1 text-[rgba(238,238,238,1)]">My Reports</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="relative">
              All
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {getTabCount('all')}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="submitted" className="relative">
              Submitted
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {getTabCount('submitted')}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="verified" className="relative">
              Verified
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {getTabCount('verified')}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="relative">
              Resolved
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {getTabCount('resolved')}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredReports.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-muted-foreground mb-2">No Reports Found</h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'all' 
                    ? "You haven't submitted any reports yet." 
                    : `No ${activeTab} reports found.`}
                </p>
              </Card>
            ) : (
              filteredReports.map((report) => (
                <Card key={report.id} className="p-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      {report.image ? (
                        <ImageWithFallback
                          src={report.image}
                          alt={report.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-foreground truncate">{report.title}</h3>
                        <div className="flex items-center gap-1 ml-2">
                          {getStatusIcon(report.status)}
                        </div>
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{report.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{report.date} at {report.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(report.status)} variant="secondary">
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                        
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {report.status === 'submitted' && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Description preview */}
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyReports;