import React, { useState, useEffect, useRef } from 'react';
import { Bell, Globe, Search, MessageCircle, Plus, ArrowUp, ChevronDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import LanguageSelector from '../LanguageSelector';
import logo from 'figma:asset/466389611c05857928639f2fd7389181e335b79d.png';

const UpdatesFeed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIChat, setIsAIChat] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for smooth scrolling to sections
  const alertsRef = useRef<HTMLElement>(null);
  const reportsRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll functions
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  // Infinite scroll simulation
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const urgentAlerts = [
    {
      id: 1,
      type: 'Cyclone Alert',
      message: '⚠️ Cyclone Alert issued – Landfall expected in 12 hrs',
      severity: 'critical',
      time: '30 mins ago'
    },
    {
      id: 2,
      type: 'Storm Warning',
      message: '🌊 High tide warning - Coastal areas advised to evacuate',
      severity: 'warning',
      time: '1 hour ago'
    }
  ];

  const citizenReports = [
    {
      id: 1,
      title: 'Oil spill at Marina Beach',
      location: 'Marina Beach, Chennai',
      distance: '2.3 km',
      status: 'Verified',
      time: '45 mins ago',
      image: 'https://images.unsplash.com/photo-1698604832593-2984b65b5082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBzcGlsbCUyMG9jZWFuJTIwcG9sbHV0aW9ufGVufDF8fHx8MTc1Nzc3NzkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      title: 'Dead fish washing ashore',
      location: 'Elliot Beach, Chennai',
      distance: '5.1 km',
      status: 'Submitted',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1742304267116-70a23f211b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkJTIwZmlzaCUyMG1hcmluZSUyMGxpZmV8ZW58MXx8fHwxNzU3Nzc3OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      title: 'Massive waves near lighthouse',
      location: 'Mahabalipuram Lighthouse',
      distance: '12.7 km',
      status: 'Submitted',
      time: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1613408629165-d964ec4d8a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN0b3JtJTIwd2F2ZXMlMjBoYXphcmR8ZW58MXx8fHwxNzU3Nzc3OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const socialMediaHighlights = [
    {
      id: 1,
      platform: 'Twitter',
      snippet: 'Huge waves spotted near Kovalam beach, tourists advised to stay away',
      engagement: { likes: 234, shares: 67 },
      time: '1 hour ago'
    },
    {
      id: 2,
      platform: 'Facebook',
      snippet: 'Local fishermen report unusual sea behavior - authorities investigating',
      engagement: { likes: 156, shares: 89 },
      time: '2 hours ago'
    }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto" ref={topRef}>
      {/* Top Bar */}
      <div className="text-primary-foreground p-4 sticky top-0 z-10" style={{backgroundColor: '#053b50'}}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={logo} 
              alt="Ocean Hazard Updates Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="flex-1 text-center text-[rgba(238,238,238,1)]">Ocean Hazard Updates</h1>
          <div className="flex items-center gap-3 bg-[rgba(230,229,229,0)]">
            <Bell className="w-5 h-5 text-[#000000]" />
            <Button
              variant="ghost"
              size="icon"
              className="text-[#000000] hover:bg-white/10 w-5 h-5 p-0"
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
            placeholder="Search updates or ask AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 bg-white/20 border-white/30 text-[#000000] placeholder:text-[#000000]/70"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 text-[#64ccc5]"
            onClick={() => setIsAIChat(!isAIChat)}
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>


      </div>

      {/* Content */}
      <div className="p-4 space-y-6 bg-[rgba(238,238,238,0)]">
        {/* Urgent Alerts */}
        <section ref={alertsRef}>
          <h2 className="mb-3 text-[#000000]">Urgent Alerts</h2>
          <div className="space-y-2">
            {urgentAlerts.map((alert) => (
              <Card key={alert.id} className={`p-4 border-l-4 ${
                alert.severity === 'critical' 
                  ? 'border-l-red-500 bg-red-50' 
                  : 'border-l-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-foreground">{alert.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                    {alert.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Citizen Reports */}
        <section ref={reportsRef}>
          <h2 className="mb-3 text-[#000000]">Recent Citizen Reports</h2>
          <div className="space-y-3">
            {citizenReports.map((report) => (
              <Card key={report.id} className="p-4">
                <div className="flex gap-3">
                  <ImageWithFallback
                    src={report.image}
                    alt={report.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.location} • {report.distance}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge 
                        variant={report.status === 'Verified' ? 'default' : 'secondary'}
                        className={report.status === 'Verified' ? 'bg-accent text-accent-foreground' : ''}
                      >
                        {report.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{report.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Media Highlights */}
        <section ref={socialRef}>
          <h2 className="mb-3 text-[#000000]">Social Media Highlights</h2>
          <div className="space-y-3">
            {socialMediaHighlights.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-xs text-secondary-foreground">
                      {post.platform === 'Twitter' ? '𝕏' : 'f'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{post.snippet}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>👍 {post.engagement.likes}</span>
                        <span>🔄 {post.engagement.shares}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More Section */}
        <section className="text-center py-6">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="w-full max-w-xs mx-auto"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading more updates...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Load More Updates
              </div>
            )}
          </Button>
        </section>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          className="fixed bottom-32 right-4 w-12 h-12 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg transition-all duration-300 z-40"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      

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

export default UpdatesFeed;