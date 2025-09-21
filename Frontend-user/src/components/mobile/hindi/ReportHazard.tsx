import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Upload, Save, Send } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';

const ReportHazardHindi = () => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    eventType: '',
    media: [] as File[]
  });

  const [isDraft, setIsDraft] = useState(false);

  const eventTypes = [
    { value: 'flood', label: 'बाढ़' },
    { value: 'oil-spill', label: 'तेल रिसाव' },
    { value: 'dead-fish', label: 'मृत मछलियाँ' },
    { value: 'storm', label: 'तूफ़ान' },
    { value: 'other', label: 'अन्य' }
  ];

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...files]
    }));
  };

  const handleSubmit = () => {
    console.log('रिपोर्ट जमा की गई:', formData);
    // Handle submission logic here
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    console.log('ड्राफ्ट सहेजा गया:', formData);
    setTimeout(() => setIsDraft(false), 2000);
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10" style={{backgroundColor: '#053b50'}}>
        <div className="flex items-center gap-3">
          <h1 className="flex-1" style={{color: '#000000'}}>खतरे की रिपोर्ट करें</h1>
          <div className="flex items-center gap-2">
            {offlineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-6">
        {/* Media Upload */}
        <Card className="p-6">
          <h2 className="mb-4" style={{color: '#000000'}}>मीडिया अपलोड करें</h2>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              अपनी फाइलें यहाँ खींचें या ब्राउज़ करने के लिए क्लिक करें
            </p>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
              id="media-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="media-upload" className="cursor-pointer">
                <Camera className="w-4 h-4 mr-2" />
                फाइल चुनें
              </label>
            </Button>
          </div>

          {formData.media.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                अपलोड की गई फाइलें:
              </p>
              <div className="space-y-2">
                {formData.media.map((file, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {file.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Description */}
        <Card className="p-6">
          <h2 className="mb-4" style={{color: '#000000'}}>विवरण</h2>
          <Textarea
            id="description"
            placeholder="घटना का विस्तृत विवरण दें..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-[120px] resize-none"
          />
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h2 className="mb-4" style={{color: '#000000'}}>स्थान</h2>
          <div className="space-y-3">
            <Input
              id="location"
              placeholder="स्थान का नाम या पता दर्ज करें"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
            <Button variant="outline" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              ऑटो-जीओटैग + नक्शे पर पिन लगाएं
            </Button>
          </div>
        </Card>

        {/* Event Type */}
        <Card className="p-6">
          <h2 className="mb-4" style={{color: '#000000'}}>घटना का प्रकार</h2>
          <Select 
            value={formData.eventType} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="घटना का प्रकार चुनें" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleSaveDraft}
            disabled={isDraft}
          >
            <Save className="w-4 h-4 mr-2" />
            {isDraft ? 'सहेजा गया!' : 'बाद में सहेजें और सिंक करें'}
          </Button>
          
          <Button 
            className="w-full"
            onClick={handleSubmit}
            disabled={!formData.description || !formData.eventType}
          >
            <Send className="w-4 h-4 mr-2" />
            जमा करें
          </Button>
        </div>

        {/* Guidelines */}
        <Card className="p-4 bg-muted/30">
          <h3 className="font-medium text-foreground mb-2">रिपोर्टिंग दिशानिर्देश</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• स्पष्ट फोटो या वीडियो अपलोड करें</li>
            <li>• सटीक स्थान की जानकारी दें</li>
            <li>• घटना का विस्तृत विवरण प्रदान करें</li>
            <li>• केवल वास्तविक घटनाओं की रिपोर्ट करें</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ReportHazardHindi;