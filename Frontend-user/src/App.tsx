import React, { useState, useEffect } from 'react';
import UpdatesFeed from './components/mobile/UpdatesFeed';
import ReportHazard from './components/mobile/ReportHazard';
import MapScreen from './components/mobile/MapScreen';
import MyReports from './components/mobile/MyReports';
import Profile from './components/mobile/Profile';
import UpdatesFeedHindi from './components/mobile/hindi/UpdatesFeed';
import ReportHazardHindi from './components/mobile/hindi/ReportHazard';
import MapScreenHindi from './components/mobile/hindi/MapScreen';
import MyReportsHindi from './components/mobile/hindi/MyReports';
import ProfileHindi from './components/mobile/hindi/Profile';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

type Screen = 'updates' | 'report' | 'map' | 'reports' | 'profile';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('updates');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const { selectedLanguage } = useLanguage();
  const isHindi = selectedLanguage.code === 'hi';

  // Auto-hide navigation after 10 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavCollapsed(true);
    }, 600000);

    return () => clearTimeout(timer);
  }, []);

  // Reset timer when user interacts with navigation
  const resetAutoHideTimer = () => {
    if (isNavCollapsed) {
      setIsNavCollapsed(false);
    }
  };

  const renderMainScreenContent = () => {
    if (isHindi) {
      switch (currentScreen) {
        case 'updates':
          return <UpdatesFeedHindi />;
        case 'map':
          return <MapScreenHindi />;
        case 'reports':
          return <MyReportsHindi />;
        case 'profile':
          return <ProfileHindi />;
        default:
          return <UpdatesFeedHindi />;
      }
    } else {
      switch (currentScreen) {
        case 'updates':
          return <UpdatesFeed />;
        case 'map':
          return <MapScreen />;
        case 'reports':
          return <MyReports />;
        case 'profile':
          return <Profile />;
        default:
          return <UpdatesFeed />;
      }
    }
  };

  const renderReportScreen = () => {
    if (isHindi) {
      return <ReportHazardHindi />;
    } else {
      return <ReportHazard />;
    }
  };

  // Vertical navigation sidebar component
  const VerticalNavigation = () => (
    <div 
      className={`fixed left-0 top-0 bottom-0 bg-primary text-primary-foreground z-50 flex flex-col transition-all duration-300 ease-in-out ${
        isNavCollapsed ? 'w-[60px]' : 'w-[200px]'
      }`}
    >
      {/* Toggle Button */}
      <button
        className="p-3 hover:bg-white/10 transition-colors duration-200 border-b"
        style={{backgroundColor: '#176b87', borderBottomColor: '#000000', color: '#000000'}}
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isNavCollapsed ? 'rotate-180' : ''}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col py-4" style={{backgroundColor: '#176b87'}}>
        <button 
          className={`flex items-center gap-3 px-3 py-4 transition-all duration-300 hover:bg-[#B2EBF2] border-b group ${
            currentScreen === 'updates' ? '' : ''
          }`}
          style={{
            borderBottomColor: '#000000',
            backgroundColor: currentScreen === 'updates' ? '#e8dccf' : 'transparent',
            color: '#000000'
          }}
          onClick={() => {
            setCurrentScreen('updates');
            resetAutoHideTimer();
          }}
        >
          <svg 
            className="w-5 h-5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {!isNavCollapsed && (
            <span className={`text-sm whitespace-nowrap transition-colors duration-300 ${
              currentScreen === 'updates' ? 'text-[#000000]' : 'text-[rgba(238,238,238,1)] group-hover:text-[#000000]'
            }`}>
              {isHindi ? 'अपडेट' : 'Updates'}
            </span>
          )}
        </button>

        <button 
          className={`flex items-center gap-3 px-3 py-4 transition-all duration-300 hover:bg-[#B2EBF2] border-b group ${
            currentScreen === 'map' ? '' : ''
          }`}
          style={{
            borderBottomColor: '#000000',
            backgroundColor: currentScreen === 'map' ? '#e8dccf' : 'transparent',
            color: '#000000'
          }}
          onClick={() => {
            setCurrentScreen('map');
            resetAutoHideTimer();
          }}
        >
          <svg 
            className="w-5 h-5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {!isNavCollapsed && (
            <span className={`text-sm whitespace-nowrap transition-colors duration-300 ${
              currentScreen === 'map' ? 'text-[#000000]' : 'text-[rgba(238,238,238,1)] group-hover:text-[#000000]'
            }`}>
              {isHindi ? 'नक्शा' : 'Map'}
            </span>
          )}
        </button>

        <button 
          className={`flex items-center gap-3 px-3 py-4 transition-all duration-300 hover:bg-[#B2EBF2] border-b group ${
            currentScreen === 'reports' ? '' : ''
          }`}
          style={{
            borderBottomColor: '#000000',
            backgroundColor: currentScreen === 'reports' ? '#e8dccf' : 'transparent',
            color: '#000000'
          }}
          onClick={() => {
            setCurrentScreen('reports');
            resetAutoHideTimer();
          }}
        >
          <svg 
            className="w-5 h-5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          {!isNavCollapsed && (
            <span className={`text-sm whitespace-nowrap transition-colors duration-300 ${
              currentScreen === 'reports' ? 'text-[#000000]' : 'text-[rgba(238,238,238,1)] group-hover:text-[#000000]'
            }`}>
              {isHindi ? 'मेरी रिपोर्टें' : 'My Reports'}
            </span>
          )}
        </button>

        <button 
          className={`flex items-center gap-3 px-3 py-4 transition-all duration-300 hover:bg-[#B2EBF2] border-b group ${
            currentScreen === 'report' ? '' : ''
          }`}
          style={{
            borderBottomColor: '#000000',
            backgroundColor: currentScreen === 'report' ? '#e8dccf' : 'transparent',
            color: '#000000'
          }}
          onClick={() => {
            setCurrentScreen('report');
            resetAutoHideTimer();
          }}
        >
          <svg 
            className="w-5 h-5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {!isNavCollapsed && (
            <span className={`text-sm whitespace-nowrap transition-colors duration-300 ${
              currentScreen === 'report' ? 'text-[#000000]' : 'text-[rgba(238,238,238,1)] group-hover:text-[#000000]'
            }`}>
              {isHindi ? 'रिपोर्ट करें' : 'Report Hazard'}
            </span>
          )}
        </button>

        <button 
          className={`flex items-center gap-3 px-3 py-4 transition-all duration-300 hover:bg-[#B2EBF2] border-b group ${
            currentScreen === 'profile' ? '' : ''
          }`}
          style={{
            borderBottomColor: '#000000',
            backgroundColor: currentScreen === 'profile' ? '#e8dccf' : 'transparent',
            color: '#000000'
          }}
          onClick={() => {
            setCurrentScreen('profile');
            resetAutoHideTimer();
          }}
        >
          <svg 
            className="w-5 h-5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          {!isNavCollapsed && (
            <span className={`text-sm whitespace-nowrap transition-colors duration-300 ${
              currentScreen === 'profile' ? 'text-[#000000]' : 'text-[rgba(238,238,238,1)] group-hover:text-[#000000]'
            }`}>
              {isHindi ? 'प्रोफ़ाइल' : 'Profile'}
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Vertical Navigation Sidebar */}
      <VerticalNavigation />
      
      {/* Content Area */}
      <div 
        className={`h-full w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isNavCollapsed ? 'pl-[60px]' : 'pl-[200px]'
        }`}
      >
        <div className="h-full w-full">
          {currentScreen === 'report' ? renderReportScreen() : renderMainScreenContent()}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}