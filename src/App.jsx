import React from 'react'
import Timetable from './components/Timetable'
import AssignmentTracker from './components/AssignmentTracker'
import AttendanceTracker from './components/AttendanceTracker'
import ExamCountdown from './components/ExamCountdown'
import Notes from './components/Notes'
import ThemeToggle from './components/ThemeToggle'

export default function App(){
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Smart Student Dashboard</h1>
        <ThemeToggle />
      </header>

      <main className="dashboard-grid">
        <section className="card timetable">
          <h2>Timetable Planner</h2>
          <Timetable />
        </section>

        <section className="card assignments">
          <h2>Assignment Tracker</h2>
          <AssignmentTracker />
        </section>

        <section className="card attendance">
          <h2>Attendance Tracker</h2>
          <AttendanceTracker />
        </section>

        <section className="card exams">
          <h2>Exam Countdown</h2>
          <ExamCountdown />
        </section>

        <section className="card notes fullwidth">
          <h2>Notes</h2>
          <Notes />
        </section>
      </main>

      <footer className="app-footer">Built with a minimalist glass design • LocalStorage</footer>
    </div>
  )
}
