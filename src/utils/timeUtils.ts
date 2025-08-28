export const formatTime = (date: Date, format: '12' | '24'): string => {
  if (format === '12') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTimeInZone = (timezone: string): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export const playAlarmSound = (sound: string): void => {
  // In a real app, you'd play actual sound files
  // For demo purposes, we'll use a simple beep
  const audio = new Audio(`data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUfBDSEz+zGdSgGHm7C9N2YQA==`);
  audio.play().catch(console.error);
};

export const shouldAlarmRing = (alarm: any, currentTime: Date): boolean => {
  if (!alarm.isActive) return false;
  
  const [hours, minutes] = alarm.time.split(':').map(Number);
  const alarmTime = new Date(currentTime);
  alarmTime.setHours(hours, minutes, 0, 0);
  
  return Math.abs(currentTime.getTime() - alarmTime.getTime()) < 30000; // 30 second window
};