import React, { useState } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

interface LanguageMenuProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'fullscreen' | 'popup';
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({ 
  isOpen, 
  onClose, 
  variant = 'popup' 
}) => {
  const { selectedLanguage, setSelectedLanguage, languages } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onClose();
  };

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  if (variant === 'fullscreen') {
    return (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-0 bg-background z-50"
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 sticky top-0">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
            <Globe className="w-5 h-5" />
            <h1 className="flex-1">Select Language</h1>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg bg-input-background"
          />
        </div>

        {/* Language List */}
        <div className="flex-1 overflow-y-auto">
          {filteredLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors border-b last:border-b-0"
            >
              <div className="text-left">
                <div className="font-medium text-foreground text-lg">{language.name}</div>
                <div className="text-muted-foreground">{language.nativeName}</div>
              </div>
              {selectedLanguage.code === language.code && (
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Current Selection */}
        <div className="p-4 border-t bg-muted/30">
          <div className="text-sm text-muted-foreground">Current Language</div>
          <div className="font-medium text-foreground">
            {selectedLanguage.name} ({selectedLanguage.nativeName})
          </div>
        </div>
      </motion.div>
    );
  }

  // Default popup variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <Globe className="w-5 h-5" />
            <h2 className="flex-1 font-medium">Choose Your Language</h2>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-white/10 w-8 h-8"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded bg-input-background text-sm"
            />
          </div>

          {/* Language Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 gap-2">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`p-3 rounded-lg border transition-all hover:bg-muted/50 ${
                    selectedLanguage.code === language.code 
                      ? 'border-accent bg-accent/10' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-medium text-foreground">{language.name}</div>
                      <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                    </div>
                    {selectedLanguage.code === language.code && (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/20">
            <div className="text-xs text-muted-foreground text-center">
              Selected: {selectedLanguage.name} ({selectedLanguage.nativeName})
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LanguageMenu;