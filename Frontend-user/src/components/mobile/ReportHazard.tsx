import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Upload, Send, Wifi, WifiOff } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface ReportHazardProps {
  onBack?: () => void;
}

const ReportHazard: React.FC<ReportHazardProps> = ({ onBack }) => {
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [offlineMode, setOfflineMode] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const eventTypes = [
    'Flood',
    'Oil Spill',
    'Dead Fish',
    'Storm',
    'Cyclone',
    'Tsunami Warning',
    'Chemical Pollution',
    'Unusual Wave Activity',
    'Marine Life Distress',
    'Coastal Erosion',
    'Other'
  ];

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setMediaFiles(Array.from(files));
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting report:', {
      description,
      eventType,
      location,
      offlineMode,
      mediaFiles
    });
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-[#053b50] text-primary-foreground p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button 
              variant="ghost" 
              size="icon"
              className="text-[#000000] hover:bg-white/10"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="flex-1 text-[rgba(238,238,238,1)]">Report Hazard</h1>
          <div className="flex items-center gap-2">
            {offlineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-6">
        {/* Media Upload */}
        <Card className="p-6">
          <h2 className="mb-4 text-[#000000]">Upload Media</h2>
          <div className="space-y-4 bg-[rgba(0,0,0,0)]">
            <div className="border-2 border-dashed border-accent rounded-lg p-8 text-center bg-[rgba(0,0,0,0)]">
              <Camera className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Add photos or videos of the hazard</p>
              <label htmlFor="media-upload">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </span>
                </Button>
              </label>
              <input
                id="media-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaUpload}
              />
            </div>
            {mediaFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Selected files:</p>
                {mediaFiles.map((file, index) => (
                  <div key={index} className="text-sm bg-accent/20 p-2 rounded">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Description */}
        <Card className="p-6">
          <h2 className="mb-4 text-[#000000]">Description</h2>
          <Textarea
            placeholder="Describe the hazard in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full"
          />
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h2 className="mb-4 text-[#000000]">Location</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-accent/20 rounded-lg">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Auto-detected: Marina Beach, Chennai</span>
            </div>
            <Input
              placeholder="Or enter location manually..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button variant="outline" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Pin on Map
            </Button>
          </div>
        </Card>

        {/* Event Type */}
        <Card className="p-6">
          <h2 className="mb-4 text-[#000000]">Event Type</h2>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger>
              <SelectValue placeholder="Select hazard type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Offline Mode */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="offline-mode">Save & Sync Later</Label>
              <p className="text-sm text-muted-foreground">
                Enable this to save your report offline and sync when connection is available
              </p>
            </div>
            <Switch
              id="offline-mode"
              checked={offlineMode}
              onCheckedChange={setOfflineMode}
            />
          </div>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
        >
          <Send className="w-4 h-4 mr-2" />
          {offlineMode ? 'Save Report' : 'Submit Report'}
        </Button>
      </div>
    </div>
  );
};

export default ReportHazard;