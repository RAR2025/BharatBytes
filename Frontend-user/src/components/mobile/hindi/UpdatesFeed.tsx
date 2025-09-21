import React, { useState } from 'react';
import { Bell, Globe, Search, MessageCircle, Plus, Home, Map, FileText, Settings } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import LanguageSelector from '../../LanguageSelector';
import logo from 'figma:asset/466389611c05857928639f2fd7389181e335b79d.png';

const UpdatesFeedHindi = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIChat, setIsAIChat] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const urgentAlerts = [
    {
      id: 1,
      title: '⚠️ चक्रवात चेतावनी जारी – 12 घंटे में तट पर टकराने की संभावना',
      type: 'चक्रवात चेतावनी',
      time: '10 मिनट पहले',
      severity: 'urgent'
    },
    {
      id: 2,
      title: 'ज्वार चेतावनी – तटीय क्षेत्रों को खाली करने की सलाह',
      type: 'तूफ़ान चेतावनी',
      time: '25 मिनट पहले',
      severity: 'high'
    }
  ];

  const citizenReports = [
    {
      id: 1,
      title: 'मरीना बीच पर तेल रिसाव',
      location: 'मरीना बीच, चेन्नई',
      time: '2 घंटे पहले',
      status: 'सत्यापित',
      reporter: 'अजय कुमार',
      type: 'तेल रिसाव'
    },
    {
      id: 2,
      title: 'किनारे पर मृत मछलियाँ',
      location: 'इलियट बीच',
      time: '4 घंटे पहले',
      status: 'जमा किया गया',
      reporter: 'प्रिया शर्मा',
      type: 'मृत मछलियाँ'
    },
    {
      id: 3,
      title: 'प्रकाशस्तंभ के पास विशाल लहरें',
      location: 'मामल्लापुरम',
      time: '6 घंटे पहले',
      status: 'सत्यापित',
      reporter: 'राज पटेल',
      type: 'तूफ़ान'
    }
  ];

  const socialHighlights = [
    {
      id: 1,
      content: 'कोवलम बीच के पास विशाल लहरें देखी गईं, पर्यटकों को दूर रहने की सलाह',
      platform: 'Twitter',
      engagement: '234 लाइक्स',
      time: '1 घंटा पहले'
    },
    {
      id: 2,
      content: 'स्थानीय मछुआरों ने समुद्र के असामान्य व्यवहार की सूचना दी – अधिकारी जांच कर रहे हैं',
      platform: 'Facebook',
      engagement: '89 शेयर्स',
      time: '3 घंटे पहले'
    }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10" style={{backgroundColor: '#053b50'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={logo} 
              alt="समुद्री खतरे की जानकारी लोगो" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-medium flex-1 text-center" style={{color: '#000000'}}>समुद्री खतरे की जानकारी</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5" style={{color: '#000000'}} />
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10 w-5 h-5 p-0"
              style={{color: '#000000'}}
              onClick={() => setShowLanguageSelector(true)}
            >
              <Globe className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="अपडेट खोजें या AI से पूछें…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white text-foreground"
          />
          <MessageCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Urgent Alerts */}
        <section>
          <h2 className="text-lg font-medium text-foreground mb-3" style={{color: '#000000'}}>तात्कालिक चेतावनी</h2>
          <div className="space-y-3">
            {urgentAlerts.map((alert) => (
              <Card key={alert.id} className="p-4 border-l-4 border-l-destructive bg-destructive/5">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={alert.severity === 'urgent' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm text-foreground">{alert.title}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Citizen Reports */}
        <section>
          <h2 className="text-lg font-medium text-foreground mb-3" style={{color: '#000000'}}>हाल के नागरिक रिपोर्ट</h2>
          <div className="space-y-3">
            {citizenReports.map((report) => (
              <Card key={report.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={report.status === 'सत्यापित' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {report.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{report.time}</span>
                </div>
                <h3 className="font-medium text-foreground mb-1">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{report.location}</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-xs font-medium text-accent-foreground">
                      {report.reporter.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">द्वारा {report.reporter}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Media Highlights */}
        <section>
          <h2 className="text-lg font-medium text-foreground mb-3" style={{color: '#000000'}}>सोशल मीडिया मुख्य समाचार</h2>
          <div className="space-y-3">
            {socialHighlights.map((highlight) => (
              <Card key={highlight.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {highlight.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{highlight.time}</span>
                </div>
                <p className="text-sm text-foreground mb-2">{highlight.content}</p>
                <span className="text-xs text-muted-foreground">{highlight.engagement}</span>
              </Card>
            ))}
          </div>
        </section>
      </div>



      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <LanguageSelector 
          variant="modal" 
          onClose={() => setShowLanguageSelector(false)} 
        />
      )}
    </div>
  );
};

export default UpdatesFeedHindi;