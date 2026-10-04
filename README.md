# ⏱️ Time Management Dashboard

A highly advanced, fully responsive, and visually appealing Digital Clock web application. While the base task was to create a simple digital clock, this project goes above and beyond by integrating a high-precision Stopwatch, a Pomodoro Timer, Time-Zone toggles, and a modern Glassmorphism UI with persistent Dark/Light themes.

## 🚀 Live Demo
**[Click here to view the Live Project](https://your-github-username.github.io/your-repo-name/)** *(Replace with your actual GitHub Pages link)*

## ✨ Features

- **Live Digital Clock:** Displays current time updating every second.
- **Format & Timezone Toggles:** Switch between 12H/24H formats and Local/UTC time effortlessly.
- **High-Precision Stopwatch:** Uses `performance.now()` and `requestAnimationFrame` for millisecond accuracy without time drift.
- **Pomodoro Timer:** A built-in 25-minute focus timer with an audible alarm generated via the Web Audio API (no external audio files needed).
- **Modern UI (Glassmorphism):** Frosted glass effect, neon glows, and responsive CSS design.
- **Persistent Dark/Light Mode:** Theme preference is saved using `localStorage`.

## 🛠️ Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** CSS Variables, Flexbox, Grid, Glassmorphism (`backdrop-filter`), and Responsive Design (`clamp()`).
- **Vanilla JavaScript (ES6+):** DOM Manipulation, `Intl.DateTimeFormat`, Timers, `requestAnimationFrame`, Web Audio API, and LocalStorage.

## 🧠 Approach & Outcome

### Approach:
Instead of using basic `Date` methods and manual string padding, I utilized the modern `Intl.DateTimeFormat` API to handle complex timezones (Local vs UTC) and 12H/24H formatting cleanly. For the stopwatch, `setInterval` was avoided due to its inherent drift; instead, `performance.now()` combined with `requestAnimationFrame` was used to ensure 60fps smooth and accurate time tracking. The UI was built focusing on modern aesthetics (Glassmorphism) and accessibility (responsive across mobile and desktop).

### Outcome:
The final result is a fully functional, portfolio-ready "Time Dashboard" that demonstrates a deep understanding of JavaScript timing events, browser APIs, and advanced CSS styling. It successfully meets all task objectives (Date objects, timers, DOM updates) while delivering a polished user experience.

## 📁 Folder Structure
```text
├── index.html      # Main HTML structure
├── style.css       # Styling, animations, and themes
└── script.js       # Core logic (Clock, Stopwatch, Timer, Theme)