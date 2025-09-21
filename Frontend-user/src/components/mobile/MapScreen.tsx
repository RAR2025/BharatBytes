import React, { useState } from 'react';
import { ArrowLeft, Filter, Layers, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const MapScreen: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockReports = [
    {
      id: 1,
      type: 'Oil Spill',
      location: 'Marina Beach',
      lat: 13.0475,
      lng: 80.2824,
      status: 'verified',
      severity: 'high',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Dead Fish',
      location: 'Elliot Beach',
      lat: 13.0067,
      lng: 80.2600,
      status: 'submitted',
      severity: 'medium',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'Storm',
      location: 'Mahabalipuram',
      lat: 12.6208,
      lng: 80.1982,
      status: 'verified',
      severity: 'critical',
      time: '6 hours ago'
    }
  ];

  const getMarkerColor = (severity: string, status: string) => {
    if (status === 'verified') {
      if (severity === 'critical') return 'bg-red-500';
      if (severity === 'high') return 'bg-orange-500';
      return 'bg-yellow-500';
    }
    return 'bg-gray-400';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'verified') return <CheckCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-[#053b50] text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="flex-1 text-[rgba(238,238,238,1)]">Hazard Map</h1>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-[#000000] hover:bg-white/10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-[#000000] hover:bg-white/10"
          >
            <Layers className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="m-4 p-4 space-y-4">
          <h3 className="font-medium text-[#000000]">Filter Reports</h3>
          
          <div className="space-y-2">
            <Label>Event Type</Label>
            <Select value={selectedEventType} onValueChange={setSelectedEventType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="oil-spill">Oil Spill</SelectItem>
                <SelectItem value="storm">Storm</SelectItem>
                <SelectItem value="dead-fish">Dead Fish</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="submitted">Unverified Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="heatmap" />
            <Label htmlFor="heatmap">Show Heatmap</Label>
          </div>
        </Card>
      )}

      {/* Map Container */}
      <div className="relative flex-1">
        {/* Mock Map Background */}
        <div className="h-96 bg-accent/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/30"></div>
          
          {/* Map Markers */}
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${20 + (report.id * 25)}%`,
                top: `${30 + (report.id * 15)}%`
              }}
            >
              <div className={`w-6 h-6 rounded-full ${getMarkerColor(report.severity, report.status)} border-2 border-white shadow-lg flex items-center justify-center`}>
                <MapPin className="w-3 h-3 text-white" />
              </div>
            </div>
          ))}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical (Verified)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>High (Verified)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium (Verified)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Unverified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-[#000000]">Recent Reports in Area</h3>
          {mockReports.map((report) => (
            <Card key={report.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`w-4 h-4 ${
                      report.severity === 'critical' ? 'text-red-500' :
                      report.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                    }`} />
                    <h4 className="font-medium">{report.type}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report.location}</p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={report.status === 'verified' ? 'default' : 'secondary'}
                      className={`flex items-center gap-1 ${
                        report.status === 'verified' ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      {getStatusIcon(report.status)}
                      {report.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{report.time}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapScreen;