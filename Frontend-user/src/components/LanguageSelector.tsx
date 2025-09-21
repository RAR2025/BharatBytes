import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'modal' | 'inline';
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'dropdown', 
  onClose 
}) => {
  const { selectedLanguage, setSelectedLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    onClose?.();
  };

  if (variant === 'modal') {
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
          className="w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="p-0 overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <h2 className="font-medium">Select Language</h2>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors border-b last:border-b-0"
                >
                  <div className="text-left">
                    <div className="font-medium text-foreground">{language.name}</div>
                    <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="space-y-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSelect(language)}
            className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-lg border"
          >
            <div className="text-left">
              <div className="font-medium text-foreground">{language.name}</div>
              <div className="text-sm text-muted-foreground">{language.nativeName}</div>
            </div>
            {selectedLanguage.code === language.code && (
              <Check className="w-5 h-5 text-accent" />
            )}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>{selectedLanguage.nativeName}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 z-50"
        >
          <Card className="p-0 overflow-hidden shadow-lg">
            <div className="max-h-64 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors border-b last:border-b-0"
                >
                  <div className="text-left">
                    <div className="font-medium text-foreground">{language.name}</div>
                    <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;