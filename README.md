# 🎓 Smart Student Dashboard

A modern, responsive React-based dashboard designed to help students manage their academic life efficiently. Built with a sleek glassmorphism design and smooth animations, featuring dark/light theme support.

![Dashboard Preview](https://via.placeholder.com/800x400/4a5568/ffffff?text=Smart+Student+Dashboard)

## ✨ Features

### 📅 Timetable Planner
- Interactive grid-based schedule with editable time slots
- Persistent storage using localStorage
- Clean, intuitive interface for managing daily/weekly schedules

### 📝 Assignment Tracker
- Add, edit, and manage assignments with priorities (High/Medium/Low)
- Mark assignments as completed with visual feedback
- Priority-based color coding with hover animations
- Persistent storage across sessions

### 📊 Attendance Tracker
- Track attendance for multiple subjects
- Automatic percentage calculations
- Smart threshold management with visual indicators
- Calculates allowed misses and required classes to maintain targets
- Color-coded status (OK/Warning) with pulse animations

### ⏰ Exam Countdown
- Add upcoming exams with dates
- Real-time countdown showing days and hours remaining
- Visual progress indicators
- Completed exams marked with strikethrough

### 📓 Notes
- Rich text editor with live markdown preview
- Split-pane interface for editing and previewing
- Persistent storage for important notes and study materials

### 🌙 Theme Toggle
- Seamless dark/light mode switching
- Theme preference saved to localStorage
- Smooth transitions between themes
- Optimized color schemes for both modes

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Pure CSS with modern features
  - CSS Custom Properties (Variables)
  - CSS Grid & Flexbox
  - Glassmorphism effects with backdrop-filter
  - Keyframe animations
  - Responsive design
- **Typography**: Google Fonts (Montserrat + Inter)
- **State Management**: React useState/useEffect hooks
- **Data Persistence**: Browser localStorage
- **Icons**: CSS-based (no external icon libraries)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-student-dashboard.git
   cd smart-student-dashboard
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
   Navigate to `http://localhost:5173` to view the dashboard

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## 🏗️ Project Structure

```
smart-student-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AssignmentTracker.jsx    # Assignment management
│   │   ├── AttendanceTracker.jsx    # Attendance calculations
│   │   ├── ExamCountdown.jsx        # Exam timer functionality
│   │   ├── Notes.jsx                # Notes editor/preview
│   │   ├── ThemeToggle.jsx          # Dark/light mode switcher
│   │   └── Timetable.jsx            # Schedule grid
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # React entry point
│   └── styles.css                   # Global styles & themes
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette

**Light Theme:**
- Primary: `#3182ce` (Blue)
- Background: `#ffffff` with gradient
- Text: `#2d3748`
- Glass: `rgba(255, 255, 255, 0.9)`
- Border: `rgba(0, 0, 0, 0.1)`

**Dark Theme:**
- Primary: `#63b3ed` (Light Blue)
- Background: `#1a202c` with gradient
- Text: `#f7fafc`
- Glass: `rgba(255, 255, 255, 0.05)`
- Border: `rgba(255, 255, 255, 0.1)`

### Typography

- **Headings**: Montserrat (600-700 weight)
- **Body**: Inter (400-600 weight)
- **Responsive scaling**: Fluid typography principles

### Animations

- **Entrance**: Staggered fade-in animations
- **Hover**: Transform and shadow effects
- **Status**: Pulse animations for alerts
- **Theme**: Smooth color transitions
- **Micro-interactions**: Button presses, list item slides

## 📱 Responsive Design

- **Desktop**: 3-column grid layout
- **Tablet**: 2-column grid (max-width: 1000px)
- **Mobile**: Single column (max-width: 640px)
- **Touch-friendly**: Optimized button sizes and spacing

## 🔧 Key Components

### AttendanceTracker.jsx
Implements sophisticated attendance calculations:

```javascript
// Attendance percentage
percentage = (attended / total) * 100

// Allowed misses to maintain threshold
allowed = Math.floor(attended / threshold - total)

// Classes needed to reach threshold
needed = Math.ceil((threshold * total - attended) / (1 - threshold))
```

### ThemeToggle.jsx
Manages theme switching with localStorage persistence:

```javascript
const [darkMode, setDarkMode] = useState(
  localStorage.getItem('theme') === 'dark'
);
```

## 🎯 Usage Guide

1. **Timetable**: Click on time slots to add/edit schedule entries
2. **Assignments**: Use the input field to add new assignments, select priority
3. **Attendance**: Add subjects, track attendance, set target thresholds
4. **Exams**: Add exam dates to see countdown timers
5. **Notes**: Write in markdown format, see live preview
6. **Theme**: Click the toggle button to switch between light/dark modes

## 🌟 Advanced Features

- **Glassmorphism UI**: Modern frosted glass effects
- **Smooth Animations**: CSS keyframes for enhanced UX
- **Accessibility**: Focus indicators, reduced motion support
- **Performance**: Optimized React rendering, efficient CSS
- **Persistence**: All data saved locally, survives browser refreshes
- **Progressive Enhancement**: Works without JavaScript (basic HTML fallback)

## 🚀 Future Enhancements

- [ ] **Data Export/Import**: JSON export for backup/migration
- [ ] **Charts & Analytics**: Visual attendance trends and study statistics
- [ ] **Notifications**: Browser notifications for upcoming exams
- [ ] **Offline Support**: Service worker for offline functionality
- [ ] **Multi-language**: Internationalization support
- [ ] **Collaboration**: Share timetables and notes with classmates
- [ ] **Mobile App**: React Native version for native mobile experience
- [ ] **Cloud Sync**: Optional cloud storage integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Maintain consistent code style
- Add comments for complex logic
- Test across different browsers
- Ensure responsive design works on all screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Font pairing inspired by modern design systems
- Glassmorphism design trends
- Open source community for inspiration

## 📞 Support

If you find this project helpful, please give it a ⭐️ star!

For questions or issues, please open a [GitHub Issue](https://github.com/your-username/smart-student-dashboard/issues).

---

**Happy studying! 📚✨**

