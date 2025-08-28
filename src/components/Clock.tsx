import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon, Globe, Settings } from 'lucide-react';
import { formatTime, formatDate, getTimeInZone } from '../utils/timeUtils';
import { TimeZone } from '../types';

interface ClockProps {
  timeFormat: '12' | '24';
  onTimeFormatChange: (format: '12' | '24') => void;
}

const timeZones: TimeZone[] = [
  { name: 'New York', zone: 'America/New_York', offset: 'UTC-5' },
  { name: 'London', zone: 'Europe/London', offset: 'UTC+0' },
  { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 'UTC+9' },
  { name: 'Sydney', zone: 'Australia/Sydney', offset: 'UTC+11' },
  { name: 'Los Angeles', zone: 'America/Los_Angeles', offset: 'UTC-8' },
  { name: 'Dubai', zone: 'Asia/Dubai', offset: 'UTC+4' }
];

export const Clock: React.FC<ClockProps> = ({ timeFormat, onTimeFormatChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>(timeZones.slice(0, 3));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTimeFormat = () => {
    onTimeFormatChange(timeFormat === '12' ? '24' : '12');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ClockIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Current Time</h1>
          </div>
          
          <div className="text-6xl font-mono font-bold text-gray-900 mb-2">
            {formatTime(currentTime, timeFormat)}
          </div>
          
          <div className="text-lg text-gray-600 mb-4">
            {formatDate(currentTime)}
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-500">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
            
            <button
              onClick={toggleTimeFormat}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {timeFormat === '12' ? '24H' : '12H'} Format
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">World Clock</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedTimeZones.map((tz) => {
            const zoneTime = getTimeInZone(tz.zone);
            return (
              <div
                key={tz.zone}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="text-lg font-semibold text-gray-800 mb-1">
                  {tz.name}
                </div>
                <div className="text-2xl font-mono font-bold text-blue-600 mb-1">
                  {formatTime(zoneTime, timeFormat)}
                </div>
                <div className="text-sm text-gray-500">
                  {tz.offset}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Time Zone
          </label>
          <select
            onChange={(e) => {
              const selectedZone = timeZones.find(tz => tz.zone === e.target.value);
              if (selectedZone && !selectedTimeZones.find(tz => tz.zone === selectedZone.zone)) {
                setSelectedTimeZones([...selectedTimeZones, selectedZone]);
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a timezone...</option>
            {timeZones.map((tz) => (
              <option key={tz.zone} value={tz.zone}>
                {tz.name} ({tz.offset})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};