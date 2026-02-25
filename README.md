Smart Student Dashboard

Stack: React + Vite (UI styled with a minimalist glass look; Tailwind may be added later)

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

What I included:
- Timetable planner (editable grid, persists to localStorage)
- Assignment tracker (to-do list with priority and status)
- Attendance tracker (core logic implemented; calculates percent, allowed misses, and needed classes to reach threshold)
- Exam countdown (upcoming exams with days/hours left)
- Notes (simple markdown preview)
- Dark mode toggle persisted to `localStorage`

Key attendance formulas:

Attendance % = (Attended / Total) * 100

Misses allowed (keeping >= threshold): allowed = floor(Attended / threshold - Total)

If below threshold, classes needed to reach threshold: solve (A + y)/(T + y) >= threshold -> y = ceil((threshold*T - A)/(1 - threshold))

Files to inspect:
- `src/components/AttendanceTracker.jsx`
- `src/styles.css`

Next steps (optional):
- Add Tailwind integration and refine responsive breakpoints
- Add export/import of data (JSON)
- Add simple charts (attendance trends)

