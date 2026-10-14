import React, { useState, useEffect } from 'react';
import { User, LanguageCode, CropItem } from './types';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { CropRecommenderWizard } from './components/recommendation/CropRecommenderWizard';
import { CropLibrary } from './components/crops/CropLibrary';
import { CropDetailModal } from './components/crops/CropDetailModal';
import { SoilHealthModule } from './components/soil/SoilHealthModule';
import { WeatherModule } from './components/weather/WeatherModule';
import { DiseaseDetectionModule } from './components/disease/DiseaseDetectionModule';
import { MarketModule } from './components/market/MarketModule';
import { GovernmentSchemesModule } from './components/schemes/GovernmentSchemesModule';
import { AgriChatbotVoice } from './components/ai/AgriChatbotVoice';
import { MyFarmsHistoryModule } from './components/farms/MyFarmsHistoryModule';
import { AdminPanel } from './components/admin/AdminPanel';
import { AuthSystem } from './components/auth/AuthSystem';
import { ReportModal } from './components/report/ReportModal';
import { NeonStatusModal } from './components/layout/NeonStatusModal';
import { IntroVideoScreen } from './components/intro/IntroVideoScreen';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Introductory video screen state displayed before main website
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('agrivision_intro_completed') !== 'true';
    } catch {
      return true;
    }
  });

  // Default logged-in user state, restored from server session cookie on mount
  const [user, setUser] = useState<User | null>({
    id: 'usr-farmer-demo',
    name: 'Rajesh Patel (Farmer)',
    email: 'rajesh.farmer@agrivision.ai',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    location: { state: 'Gujarat', district: 'Rajkot', village: 'Anandpar' },
    createdAt: new Date().toISOString()
  });

  // Modal States
  const [selectedCrop, setSelectedCrop] = useState<CropItem | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportFarmData, setReportFarmData] = useState<any>(null);
  const [isDbStatusOpen, setIsDbStatusOpen] = useState(false);

  // Validate existing session from HttpOnly cookie or Bearer token on mount
  useEffect(() => {
    const token = localStorage.getItem('agrivision_token');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch('/api/auth/me', {
      credentials: 'include',
      headers
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.warn('Session verification note:', err);
      });
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('agrivision_token');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers
      });
    } catch (err) {
      console.warn('Logout network error:', err);
    }
    localStorage.removeItem('agrivision_token');
    setUser(null);
  };

  const handleOpenReport = (farmData?: any) => {
    setReportFarmData(farmData);
    setIsReportOpen(true);
  };

  const handleSelectCrop = (crop: CropItem) => {
    setSelectedCrop(crop);
  };

  // 1. Display introductory video screen before main website if active
  if (showIntro) {
    return (
      <IntroVideoScreen
        onComplete={() => {
          setShowIntro(false);
          setCurrentTab('dashboard');
        }}
        videoSrc="/assets/videos/agrivision_ai_website_animation.mp4"
      />
    );
  }

  // 2. Authentication screen if user is not signed in
  if (!user) {
    return (
      <AuthSystem
        language={language}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setCurrentTab('dashboard');
        }}
        onWatchIntro={() => setShowIntro(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        user={user}
        language={language}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Header */}
        <Header
          user={user}
          onLogout={handleLogout}
          language={language}
          onLanguageChange={setLanguage}
          onSearchQuery={setSearchQuery}
          onOpenDbStatus={() => setIsDbStatusOpen(true)}
          onWatchIntro={() => setShowIntro(true)}
        />

        {/* Tab Route Content */}
        <main className="flex-1 pb-12">
          {currentTab === 'dashboard' && (
            <OverviewDashboard
              user={user}
              weather={null}
              latestPrediction={null}
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onSelectCrop={handleSelectCrop}
            />
          )}

          {currentTab === 'recommender' && (
            <CropRecommenderWizard
              language={language}
              onSelectCrop={handleSelectCrop}
            />
          )}

          {currentTab === 'crops' && (
            <CropLibrary
              language={language}
              onSelectCrop={handleSelectCrop}
            />
          )}

          {currentTab === 'soil' && (
            <SoilHealthModule language={language} />
          )}

          {currentTab === 'weather' && (
            <WeatherModule language={language} />
          )}

          {currentTab === 'disease' && (
            <DiseaseDetectionModule language={language} />
          )}

          {currentTab === 'market' && (
            <MarketModule language={language} />
          )}

          {currentTab === 'schemes' && (
            <GovernmentSchemesModule language={language} />
          )}

          {currentTab === 'assistant' && (
            <AgriChatbotVoice language={language} />
          )}

          {currentTab === 'farms' && (
            <MyFarmsHistoryModule
              user={user}
              language={language}
              onOpenReport={handleOpenReport}
            />
          )}

          {currentTab === 'admin' && user.role === 'admin' && (
            <AdminPanel user={user} language={language} />
          )}
        </main>
      </div>

      {/* Crop Detail Modal */}
      {selectedCrop && (
        <CropDetailModal
          crop={selectedCrop}
          language={language}
          onClose={() => setSelectedCrop(null)}
        />
      )}

      {/* Printable Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        farmData={reportFarmData}
        language={language}
      />

      {/* Neon Database Status & Diagnostics Modal */}
      <NeonStatusModal
        isOpen={isDbStatusOpen}
        onClose={() => setIsDbStatusOpen(false)}
      />
    </div>
  );
}
