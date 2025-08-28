export interface Alarm {
  id: string;
  label: string;
  time: string;
  isActive: boolean;
  repeat: 'none' | 'daily' | 'weekdays' | 'weekends' | 'custom';
  customDays?: number[];
  sound: string;
  snoozeEnabled: boolean;
  snoozeMinutes: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'social' | 'other';
  reminder?: number; // minutes before event
}

export interface TimeZone {
  name: string;
  zone: string;
  offset: string;
}

export interface Settings {
  timeFormat: '12' | '24';
  theme: 'light' | 'dark';
  defaultAlarmSound: string;
  calendarView: 'daily' | 'weekly' | 'monthly';
  notifications: boolean;
}

export type ViewType = 'clock' | 'calendar' | 'alarm' | 'settings';