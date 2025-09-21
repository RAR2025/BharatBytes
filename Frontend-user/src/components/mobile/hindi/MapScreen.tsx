import React, { useState } from 'react';
import { ArrowLeft, Filter, MapPin, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

const MapScreenHindi: React.FC = () => {
  const [filters, setFilters] = useState({
    eventType: 'all',
    date: 'all',
    status: 'all'
  });

  const [showFilters, setShowFilters] = useState(false);

  const hazardMarkers = [
    {
      id: 1,
      title: 'मरीना बीच पर तेल रिसाव',
      type: 'तेल रिसाव',
      status: 'सत्यापित',
      coordinates: { lat: 13.0527, lng: 80.2785 },
      severity: 'high',
      time: '2 घंटे पहले'
    },
    {
      id: 2,
      title: 'इलियट बीच पर मृत मछलियाँ',
      type: 'मृत मछलियाँ',
      status: 'जमा किया गया',
      coordinates: { lat: 13.0067, lng: 80.2803 },
      severity: 'medium',
      time: '4 घंटे पहले'
    },
    {
      id: 3,
      title: 'मामल्लापुरम में विशाल लहरें',
      type: 'तूफ़ान',
      status: 'सत्यापित',
      coordinates: { lat: 12.6208, lng: 80.1982 },
      severity: 'high',
      time: '6 घंटे पहले'
    },
    {
      id: 4,
      title: 'पुलिकट झील में बाढ़',
      type: 'बाढ़',
      status: 'जमा किया गया',
      coordinates: { lat: 13.6288, lng: 80.0492 },
      severity: 'medium',
      time: '8 घंटे पहले'
    }
  ];

  const eventTypes = [
    { value: 'all', label: 'सभी प्रकार' },
    { value: 'flood', label: 'बाढ़' },
    { value: 'oil-spill', label: 'तेल रिसाव' },
    { value: 'dead-fish', label: 'मृत मछलियाँ' },
    { value: 'storm', label: 'तूफ़ान' }
  ];

  const dateOptions = [
    { value: 'all', label: 'सभी दिनांक' },
    { value: 'today', label: 'आज' },
    { value: 'week', label: 'इस सप्ताह' },
    { value: 'month', label: 'इस महीने' }
  ];

  const statusOptions = [
    { value: 'all', label: 'सभी स्थिति' },
    { value: 'verified', label: 'सत्यापित' },
    { value: 'unverified', label: 'असत्यापित' },
    { value: 'resolved', label: 'हल किया गया' }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10" style={{backgroundColor: '#053b50'}}>
        <div className="flex items-center gap-3">
          <h1 className="flex-1" style={{color: '#000000'}}>खतरा नक्शा</h1>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground hover:bg-white/10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1">
        {/* Map Placeholder */}
        <div className="w-full h-96 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">इंटरैक्टिव मानचित्र लोड हो रहा है...</p>
          </div>
        </div>

        {/* Map Overlays - Hazard Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {hazardMarkers.map((marker, index) => (
            <div 
              key={marker.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 20)}%`
              }}
            >
              <div className={`w-3 h-3 rounded-full ${
                marker.severity === 'high' ? 'bg-destructive' : 'bg-accent'
              } border-2 border-white shadow-lg animate-pulse`} />
            </div>
          ))}
        </div>
      </div>

      {/* Hazard List */}
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        <h2 className="font-medium text-foreground">खतरे की रिपोर्टें</h2>
        
        {hazardMarkers.map((hazard) => (
          <Card key={hazard.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={hazard.status === 'सत्यापित' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {hazard.status === 'सत्यापित' ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {hazard.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {hazard.type}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">{hazard.time}</span>
            </div>
            
            <h3 className="font-medium text-foreground mb-1">{hazard.title}</h3>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{hazard.coordinates.lat.toFixed(4)}, {hazard.coordinates.lng.toFixed(4)}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 space-y-2">
        <Button size="sm" variant="secondary" className="w-10 h-10 rounded-full">+</Button>
        <Button size="sm" variant="secondary" className="w-10 h-10 rounded-full">-</Button>
      </div>

      {/* Legend */}
      <div className="absolute top-24 left-4 bg-white p-3 rounded-lg shadow-lg">
        <h3 className="text-sm font-medium text-foreground mb-2">लेजेंड</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-xs text-muted-foreground">उच्च गंभीरता</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-xs text-muted-foreground">मध्यम गंभीरता</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreenHindi;