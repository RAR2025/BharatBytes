import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Globe, Shield, HelpCircle, LogOut, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import LanguageSelector from '../LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';

const Profile: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    updates: false,
    social: true
  });

  const userInfo = {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Chennai, Tamil Nadu',
    joinDate: 'January 2024',
    reportsCount: 12,
    verifiedReports: 8
  };



  const menuItems = [
    {
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      action: () => console.log('Privacy settings')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      action: () => console.log('Help & Support')
    }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-[#053b50] text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="flex-1 text-[rgba(238,238,238,1)]">Profile & Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt={userInfo.name} />
              <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-foreground">{userInfo.name}</h2>
              <p className="text-sm text-muted-foreground">Member since {userInfo.joinDate}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{userInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{userInfo.location}</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#053b50]">{userInfo.reportsCount}</div>
              <div className="text-xs text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#053b50]">{userInfo.verifiedReports}</div>
              <div className="text-xs text-muted-foreground">Verified Reports</div>
            </div>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-[#053b50]" />
            <h3 className="font-medium text-foreground">Language Preference</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Current: {selectedLanguage.name} ({selectedLanguage.nativeName})
          </p>
          <LanguageSelector variant="dropdown" />
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-[#053b50]" />
            <h3 className="font-medium text-foreground">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-notifications">Emergency Alerts</Label>
                <p className="text-sm text-muted-foreground">Critical hazard warnings</p>
              </div>
              <Switch
                id="alert-notifications"
                checked={notifications.alerts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, alerts: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="report-notifications">Report Updates</Label>
                <p className="text-sm text-muted-foreground">Status changes on your reports</p>
              </div>
              <Switch
                id="report-notifications"
                checked={notifications.reports}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, reports: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="update-notifications">General Updates</Label>
                <p className="text-sm text-muted-foreground">App news and features</p>
              </div>
              <Switch
                id="update-notifications"
                checked={notifications.updates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, updates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="social-notifications">Social Media Highlights</Label>
                <p className="text-sm text-muted-foreground">Trending hazard posts</p>
              </div>
              <Switch
                id="social-notifications"
                checked={notifications.social}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, social: checked }))
                }
              />
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="p-0 overflow-hidden">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={item.action}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-[#053b50]" />
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </Card>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;