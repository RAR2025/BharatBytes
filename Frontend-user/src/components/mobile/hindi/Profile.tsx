import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Globe, Shield, HelpCircle, LogOut, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Separator } from '../../ui/separator';
import LanguageSelector from '../../LanguageSelector';
import { useLanguage } from '../../../contexts/LanguageContext';

const ProfileHindi: React.FC = () => {
  const { selectedLanguage } = useLanguage();
  const [notifications, setNotifications] = useState({
    alerts: true,
    reports: true,
    updates: false,
    social: true
  });

  const userInfo = {
    name: 'अमित शर्मा',
    email: 'amit.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'चेन्नई, तमिलनाडु',
    joinDate: 'जनवरी 2024',
    reportsCount: 12,
    verifiedReports: 8
  };

  const menuItems = [
    {
      icon: User,
      title: 'व्यक्तिगत जानकारी',
      subtitle: 'अपनी प्रोफ़ाइल जानकारी प्रबंधित करें',
      action: () => console.log('व्यक्तिगत जानकारी')
    },
    {
      icon: Shield,
      title: 'गोपनीयता सेटिंग्स',
      subtitle: 'अपनी गोपनीयता सेटिंग्स प्रबंधित करें',
      action: () => console.log('गोपनीयता सेटिंग्स')
    },
    {
      icon: HelpCircle,
      title: 'सहायता और समर्थन',
      subtitle: 'सहायता प्राप्त करें या समर्थन से संपर्क करें',
      action: () => console.log('सहायता और समर्थन')
    }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10" style={{backgroundColor: '#053b50'}}>
        <div className="flex items-center gap-3">
          <h1 className="flex-1" style={{color: '#000000'}}>प्रोफ़ाइल और सेटिंग्स</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Profile Section */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt={userInfo.name} />
              <AvatarFallback className="text-lg">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-foreground">{userInfo.name}</h2>
              <p className="text-sm text-muted-foreground">{userInfo.joinDate} से सदस्य</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{userInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{userInfo.location}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-medium text-foreground">{userInfo.reportsCount}</div>
              <div className="text-sm text-muted-foreground">कुल रिपोर्टें</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium text-accent">{userInfo.verifiedReports}</div>
              <div className="text-sm text-muted-foreground">सत्यापित</div>
            </div>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">भाषा वरीयता</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            वर्तमान: {selectedLanguage.name} ({selectedLanguage.nativeName})
          </p>
          <LanguageSelector variant="dropdown" />
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">सूचना</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alerts" className="text-sm font-medium text-foreground">
                  आपातकालीन अलर्ट
                </Label>
                <p className="text-xs text-muted-foreground">
                  तत्काल खतरे की चेतावनी प्राप्त करें
                </p>
              </div>
              <Switch
                id="alerts"
                checked={notifications.alerts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, alerts: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reports" className="text-sm font-medium text-foreground">
                  रिपोर्ट अपडेट
                </Label>
                <p className="text-xs text-muted-foreground">
                  आपकी रिपोर्टों की स्थिति अपडेट
                </p>
              </div>
              <Switch
                id="reports"
                checked={notifications.reports}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, reports: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="updates" className="text-sm font-medium text-foreground">
                  सामान्य अपडेट
                </Label>
                <p className="text-xs text-muted-foreground">
                  समुद्री हालात की नियमित जानकारी
                </p>
              </div>
              <Switch
                id="updates"
                checked={notifications.updates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, updates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="social" className="text-sm font-medium text-foreground">
                  सोशल मीडिया हाइलाइट्स
                </Label>
                <p className="text-xs text-muted-foreground">
                  संबंधित सोशल मीडिया अपडेट
                </p>
              </div>
              <Switch
                id="social"
                checked={notifications.social}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, social: checked }))
                }
              />
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card key={index} className="p-0">
              <button
                onClick={item.action}
                className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors rounded-lg"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Card className="p-0">
          <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors rounded-lg text-destructive">
            <LogOut className="w-5 h-5" />
            <div className="flex-1">
              <div className="font-medium">लॉगआउट</div>
              <div className="text-sm text-muted-foreground">अपने खाते से साइन आउट करें</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </Card>

        {/* App Info */}
        <div className="text-center pt-6">
          <p className="text-xs text-muted-foreground">
            समुद्री खतरे की जानकारी ऐप
          </p>
          <p className="text-xs text-muted-foreground">
            संस्करण 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHindi;