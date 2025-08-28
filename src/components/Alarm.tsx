import React, { useState, useEffect } from 'react';
import { AlarmClock, Plus, Edit, Trash2, Bell, BellOff, Volume2 } from 'lucide-react';
import { Alarm as AlarmType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { playAlarmSound, shouldAlarmRing } from '../utils/timeUtils';

export const Alarm: React.FC = () => {
  const [alarms, setAlarms] = useLocalStorage<AlarmType[]>('alarms', []);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState<AlarmType | null>(null);
  const [ringingAlarm, setRingingAlarm] = useState<AlarmType | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    time: '',
    repeat: 'none' as AlarmType['repeat'],
    customDays: [] as number[],
    sound: 'default',
    snoozeEnabled: true,
    snoozeMinutes: 5
  });

  const resetForm = () => {
    setFormData({
      label: '',
      time: '',
      repeat: 'none',
      customDays: [],
      sound: 'default',
      snoozeEnabled: true,
      snoozeMinutes: 5
    });
    setEditingAlarm(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      alarms.forEach(alarm => {
        if (shouldAlarmRing(alarm, currentTime) && !ringingAlarm) {
          setRingingAlarm(alarm);
          playAlarmSound(alarm.sound);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, ringingAlarm]);

  const handleSaveAlarm = () => {
    if (!formData.label || !formData.time) return;

    const alarmData: AlarmType = {
      id: editingAlarm?.id || Date.now().toString(),
      label: formData.label,
      time: formData.time,
      isActive: true,
      repeat: formData.repeat,
      customDays: formData.customDays,
      sound: formData.sound,
      snoozeEnabled: formData.snoozeEnabled,
      snoozeMinutes: formData.snoozeMinutes
    };

    if (editingAlarm) {
      setAlarms(alarms.map(a => a.id === editingAlarm.id ? alarmData : a));
    } else {
      setAlarms([...alarms, alarmData]);
    }

    setShowAlarmModal(false);
    resetForm();
  };

  const handleEditAlarm = (alarm: AlarmType) => {
    setEditingAlarm(alarm);
    setFormData({
      label: alarm.label,
      time: alarm.time,
      repeat: alarm.repeat,
      customDays: alarm.customDays || [],
      sound: alarm.sound,
      snoozeEnabled: alarm.snoozeEnabled,
      snoozeMinutes: alarm.snoozeMinutes
    });
    setShowAlarmModal(true);
  };

  const handleDeleteAlarm = (alarmId: string) => {
    setAlarms(alarms.filter(a => a.id !== alarmId));
  };

  const toggleAlarm = (alarmId: string) => {
    setAlarms(alarms.map(a => 
      a.id === alarmId ? { ...a, isActive: !a.isActive } : a
    ));
  };

  const handleSnooze = () => {
    if (!ringingAlarm) return;
    
    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + ringingAlarm.snoozeMinutes);
    
    // In a real app, you'd set a new alarm for the snooze time
    setRingingAlarm(null);
  };

  const dismissAlarm = () => {
    setRingingAlarm(null);
  };

  const getRepeatText = (alarm: AlarmType) => {
    switch (alarm.repeat) {
      case 'daily':
        return 'Daily';
      case 'weekdays':
        return 'Weekdays';
      case 'weekends':
        return 'Weekends';
      case 'custom':
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return alarm.customDays?.map(day => days[day]).join(', ') || 'Custom';
      default:
        return 'Once';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AlarmClock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Alarms</h1>
          </div>
          
          <button
            onClick={() => setShowAlarmModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Alarm
          </button>
        </div>

        <div className="space-y-4">
          {alarms.length === 0 ? (
            <div className="text-center py-12">
              <AlarmClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No alarms set</p>
              <p className="text-gray-400">Add your first alarm to get started</p>
            </div>
          ) : (
            alarms.map(alarm => (
              <div
                key={alarm.id}
                className={`bg-gray-50 rounded-lg p-4 border-2 transition-all ${
                  alarm.isActive ? 'border-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-mono font-bold text-gray-900">
                        {formatTime(alarm.time)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAlarm(alarm.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            alarm.isActive
                              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                          }`}
                        >
                          {alarm.isActive ? (
                            <Bell className="w-5 h-5" />
                          ) : (
                            <BellOff className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="font-medium">{alarm.label}</div>
                      <div className="flex items-center gap-4 mt-1">
                        <span>{getRepeatText(alarm)}</span>
                        <span className="flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          {alarm.sound}
                        </span>
                        {alarm.snoozeEnabled && (
                          <span>Snooze: {alarm.snoozeMinutes}min</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditAlarm(alarm)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAlarm(alarm.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Alarm Modal */}
      {showAlarmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingAlarm ? 'Edit Alarm' : 'Add New Alarm'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({...formData, label: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Wake up, Meeting, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repeat
                  </label>
                  <select
                    value={formData.repeat}
                    onChange={(e) => setFormData({...formData, repeat: e.target.value as AlarmType['repeat']})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {formData.repeat === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Days
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            const newDays = formData.customDays.includes(index)
                              ? formData.customDays.filter(d => d !== index)
                              : [...formData.customDays, index];
                            setFormData({...formData, customDays: newDays});
                          }}
                          className={`p-2 text-sm font-medium rounded ${
                            formData.customDays.includes(index)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sound
                  </label>
                  <select
                    value={formData.sound}
                    onChange={(e) => setFormData({...formData, sound: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="default">Default</option>
                    <option value="gentle">Gentle</option>
                    <option value="classic">Classic</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.snoozeEnabled}
                      onChange={(e) => setFormData({...formData, snoozeEnabled: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Enable snooze</span>
                  </label>
                  
                  {formData.snoozeEnabled && (
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.snoozeMinutes}
                        onChange={(e) => setFormData({...formData, snoozeMinutes: Number(e.target.value)})}
                        className="p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={5}>5 min</option>
                        <option value={10}>10 min</option>
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveAlarm}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {editingAlarm ? 'Update' : 'Save'} Alarm
                </button>
                <button
                  onClick={() => {
                    setShowAlarmModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ringing Alarm Modal */}
      {ringingAlarm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm text-center">
            <div className="p-6">
              <div className="animate-pulse">
                <Bell className="w-16 h-16 text-red-500 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {ringingAlarm.label}
              </h3>
              <p className="text-3xl font-mono font-bold text-gray-900 mb-6">
                {formatTime(ringingAlarm.time)}
              </p>
              
              <div className="flex gap-3">
                {ringingAlarm.snoozeEnabled && (
                  <button
                    onClick={handleSnooze}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Snooze
                  </button>
                )}
                <button
                  onClick={dismissAlarm}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};