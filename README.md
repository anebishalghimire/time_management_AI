# TimeManager - Comprehensive Time Management Application

A modern, feature-rich time management application built with React, TypeScript, and Tailwind CSS. This application combines clock functionality, calendar management, and alarm features in a single, intuitive interface.

![TimeManager Screenshot](https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Features

### 🕐 Digital Clock
- **Real-time Display**: Shows current time with seconds precision
- **Format Toggle**: Switch between 12-hour and 24-hour formats
- **World Clock**: Display time for multiple international time zones
- **Timezone Detection**: Automatically detects and displays your local timezone

### 📅 Calendar System
- **Multiple Views**: Daily, weekly, and monthly calendar views
- **Event Management**: Create, edit, and delete events with ease
- **Event Details**: Include title, date, time, description, and reminders
- **Color Coding**: Organize events by categories (Work, Personal, Health, Social, Other)
- **Easy Navigation**: Smooth month/year navigation with intuitive controls
- **Event Reminders**: Set custom reminder times for important events

### ⏰ Alarm Clock
- **Multiple Alarms**: Set unlimited custom alarms
- **Flexible Scheduling**: Daily, weekdays, weekends, or custom day patterns
- **Custom Labels**: Personalize each alarm with descriptive names
- **Sound Options**: Choose from multiple alarm tones
- **Snooze Function**: Configurable snooze duration (5-30 minutes)
- **Quick Toggle**: Easily enable/disable alarms without editing

### ⚙️ Settings & Customization
- **Unified Settings**: Central configuration for all features
- **Theme Options**: Light and dark mode support
- **Notification Control**: Enable/disable system notifications
- **Default Preferences**: Set default alarm sounds and calendar views
- **Persistent Storage**: All settings saved locally

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Storage**: Browser localStorage for data persistence
- **Linting**: ESLint with TypeScript support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/timemanager.git
   cd timemanager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📱 Usage Guide

### Getting Started
1. **Navigation**: Use the header navigation (desktop) or bottom tabs (mobile) to switch between features
2. **Clock**: View current time and add international time zones
3. **Calendar**: Click on any date to view/add events for that day
4. **Alarms**: Create new alarms with the "Add Alarm" button
5. **Settings**: Customize the app behavior and appearance

### Creating Events
1. Navigate to the Calendar section
2. Click "Add Event" or select a specific date
3. Fill in event details (title, time, category, etc.)
4. Set a reminder if needed
5. Save the event

### Setting Alarms
1. Go to the Alarm section
2. Click "Add Alarm"
3. Set time, label, and repeat schedule
4. Choose alarm sound and snooze options
5. Save and toggle the alarm on

### Customizing Settings
1. Access the Settings section
2. Adjust time format, theme, and default views
3. Configure notification preferences
4. Changes are automatically saved

## 🎨 Design Philosophy

- **Clean Interface**: Minimalist design focused on functionality
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Intuitive Navigation**: Clear visual hierarchy and user-friendly controls
- **Consistent Styling**: Unified color scheme and typography throughout
- **Accessibility**: High contrast ratios and keyboard navigation support

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── Clock.tsx       # Digital clock and world time
│   ├── Calendar.tsx    # Calendar and event management
│   ├── Alarm.tsx       # Alarm clock functionality
│   └── Settings.tsx    # Application settings
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── timeUtils.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. The app runs entirely in the browser with localStorage.

### Customization
- **Time Zones**: Modify the `timeZones` array in `Clock.tsx` to add/remove world clock locations
- **Alarm Sounds**: Update sound options in `Alarm.tsx` (currently uses browser-generated tones)
- **Event Categories**: Customize categories and colors in `Calendar.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component modularity
- Write descriptive commit messages
- Test on both desktop and mobile devices

## 🐛 Known Issues

- Alarm sounds use basic browser audio (consider adding custom sound files)
- Notifications require user permission in browser
- Time zone data depends on browser's Intl API

## 🔮 Future Enhancements

- [ ] Custom alarm sound uploads
- [ ] Calendar sync with external services (Google Calendar, Outlook)
- [ ] Dark mode theme implementation
- [ ] Export/import functionality for events and alarms
- [ ] Advanced recurring event patterns
- [ ] Time tracking and productivity features
- [ ] Mobile app version (React Native)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Images from [Pexels](https://www.pexels.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/timemanager/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Made with ❤️ for better time management**