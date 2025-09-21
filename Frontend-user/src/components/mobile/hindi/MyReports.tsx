import React, { useState } from 'react';
import { ArrowLeft, Filter, Clock, CheckCircle, AlertCircle, Calendar, MapPin } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

const MyReportsHindi: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'मरीना बीच पर तेल रिसाव',
      description: 'समुद्र तट पर काले तेल के धब्बे देखे गए, जो पानी की सतह पर फैल रहे हैं।',
      location: 'मरीना बीच, चेन्नई',
      type: 'तेल रिसाव',
      status: 'सत्यापित',
      submittedAt: '2024-01-15 14:30',
      verifiedAt: '2024-01-15 16:45',
      severity: 'high'
    },
    {
      id: 2,
      title: 'इलियट बीच पर मृत मछलियाँ',
      description: 'किनारे पर बड़ी संख्या में मृत मछलियाँ बह कर आई हैं।',
      location: 'इलियट बीच, चेन्नई',
      type: 'मृत मछलियाँ',
      status: 'जमा किया गया',
      submittedAt: '2024-01-14 09:15',
      verifiedAt: null,
      severity: 'medium'
    },
    {
      id: 3,
      title: 'चौपत्ती बीच पर तूफानी लहरें',
      description: 'असामान्य रूप से ऊंची लहरें और तेज़ हवा का दबाव।',
      location: 'चौपत्ती बीच, मुंबई',
      type: 'तूफ़ान',
      status: 'हल किया गया',
      submittedAt: '2024-01-12 18:00',
      verifiedAt: '2024-01-13 10:30',
      resolvedAt: '2024-01-14 12:00',
      severity: 'high'
    },
    {
      id: 4,
      title: 'कोवलम में बाढ़ की स्थिति',
      description: 'समुद्री जल स्तर में वृद्धि के कारण तटीय क्षेत्रों में पानी भर गया।',
      location: 'कोवलम बीच, केरल',
      type: 'बाढ़',
      status: 'जमा किया गया',
      submittedAt: '2024-01-10 07:45',
      verifiedAt: null,
      severity: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'सत्यापित':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'हल किया गया':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'सत्यापित':
        return 'default';
      case 'हल किया गया':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const filterReports = (status: string) => {
    if (status === 'all') return reports;
    return reports.filter(report => {
      switch (status) {
        case 'submitted':
          return report.status === 'जमा किया गया';
        case 'verified':
          return report.status === 'सत्यापित';
        case 'resolved':
          return report.status === 'हल किया गया';
        default:
          return true;
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('hi-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10" style={{backgroundColor: '#053b50'}}>
        <div className="flex items-center gap-3">
          <h1 className="flex-1" style={{color: '#000000'}}>मेरी रिपोर्टें</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-medium text-foreground">{reports.length}</div>
            <div className="text-sm text-muted-foreground">कुल रिपोर्टें</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-medium text-accent">
              {reports.filter(r => r.status === 'सत्यापित').length}
            </div>
            <div className="text-sm text-muted-foreground">सत्यापित</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-medium text-green-600">
              {reports.filter(r => r.status === 'हल किया गया').length}
            </div>
            <div className="text-sm text-muted-foreground">हल किया गया</div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">सभी</TabsTrigger>
            <TabsTrigger value="submitted">जमा किया गया</TabsTrigger>
            <TabsTrigger value="verified">सत्यापित</TabsTrigger>
            <TabsTrigger value="resolved">हल किया गया</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filterReports(activeTab).map((report) => (
              <Card key={report.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <Badge variant={getStatusColor(report.status) as any} className="text-xs">
                      {report.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {report.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    #{report.id.toString().padStart(4, '0')}
                  </span>
                </div>

                <h3 className="font-medium text-foreground mb-2">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{report.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{report.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>जमा किया गया: {formatDate(report.submittedAt)}</span>
                  </div>

                  {report.verifiedAt && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3" />
                      <span>सत्यापित: {formatDate(report.verifiedAt)}</span>
                    </div>
                  )}

                  {report.resolvedAt && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span>हल किया गया: {formatDate(report.resolvedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                  <div className={`w-2 h-2 rounded-full ${
                    report.severity === 'high' ? 'bg-destructive' : 'bg-accent'
                  }`} />
                  <Button variant="ghost" size="sm" className="text-xs">
                    विवरण देखें
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filterReports(activeTab).length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">कोई रिपोर्ट नहीं मिली</h3>
            <p className="text-sm text-muted-foreground mb-4">
              इस श्रेणी में कोई रिपोर्ट उपलब्ध नहीं है।
            </p>
            <Button variant="outline" onClick={() => setActiveTab('all')}>
              सभी रिपोर्टें देखें
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReportsHindi;