import React, { useState } from 'react';
import { Clock as ClockIcon, Calendar as CalendarIcon, AlarmClock, Settings as SettingsIcon } from 'lucide-react';
import { Clock } from './components/Clock';
import { Calendar } from './components/Calendar';
import { Alarm } from './components/Alarm';
import { Settings } from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ViewType, Settings as SettingsType } from './types';

const defaultSettings: SettingsType = {
  timeFormat: '12',
  theme: 'light',
  defaultAlarmSound: 'default',
  calendarView: 'monthly',
  notifications: true
};

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('clock');
  const [settings, setSettings] = useLocalStorage<SettingsType>('app-settings', defaultSettings);

  const navigation = [
    { id: 'clock', label: 'Clock', icon: ClockIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'alarm', label: 'Alarm', icon: AlarmClock },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'clock':
        return (
          <Clock
            timeFormat={settings.timeFormat}
            onTimeFormatChange={(format) => setSettings({ ...settings, timeFormat: format })}
          />
        );
      case 'calendar':
        return (
          <Calendar
            view={settings.calendarView}
            onViewChange={(view) => setSettings({ ...settings, calendarView: view })}
          />
        );
      case 'alarm':
        return <Alarm />;
      case 'settings':
        return <Settings settings={settings} onSettingsChange={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TimeManager</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as ViewType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="grid grid-cols-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                  currentView === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {renderView()}
      </main>
    </div>
  );
}

export default App;