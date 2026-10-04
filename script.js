// ==========================================
// 1. ADVANCED CLOCK LOGIC
// ==========================================
let is24Hour = true;
let isUTC = false;

const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const formatToggle = document.getElementById('formatToggle');
const timezoneToggle = document.getElementById('timezoneToggle');

function updateClock() {
    const now = new Date();
    
    // Time Formatting using Intl API
    const timeOptions = {
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: isUTC ? 'UTC' : undefined
    };
    
    clockElement.textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(now);

    // Date Formatting
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        timeZone: isUTC ? 'UTC' : undefined 
    };
    dateElement.textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
}

// Initialize and update every second
setInterval(updateClock, 1000);
updateClock(); 

// Toggle 12H/24H
formatToggle.addEventListener('click', () => {
    is24Hour = !is24Hour;
    formatToggle.textContent = is24Hour ? '24H Format' : '12H Format';
    formatToggle.classList.toggle('active');
    updateClock();
});

// Toggle Local/UTC
timezoneToggle.addEventListener('click', () => {
    isUTC = !isUTC;
    timezoneToggle.textContent = isUTC ? 'Show Local' : 'Show UTC';
    timezoneToggle.classList.toggle('active');
    updateClock();
});


// ==========================================
// 2. STOPWATCH LOGIC (High Precision)
// ==========================================
let isSwRunning = false;
let swStartTime;
let swElapsed = 0;
const swDisplay = document.getElementById('stopwatch');

function formatStopwatch(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateStopwatch() {
    if (isSwRunning) {
        const now = performance.now();
        const elapsed = now - swStartTime + swElapsed;
        swDisplay.textContent = formatStopwatch(elapsed);
        requestAnimationFrame(updateStopwatch); // Smooth 60fps update
    }
}

document.getElementById('swStart').addEventListener('click', () => {
    if (!isSwRunning) {
        isSwRunning = true;
        swStartTime = performance.now();
        requestAnimationFrame(updateStopwatch);
    }
});

document.getElementById('swPause').addEventListener('click', () => {
    if (isSwRunning) {
        isSwRunning = false;
        swElapsed += performance.now() - swStartTime;
    }
});

document.getElementById('swReset').addEventListener('click', () => {
    isSwRunning = false;
    swElapsed = 0;
    swDisplay.textContent = '00:00:00';
});


// ==========================================
// 3. POMODORO TIMER LOGIC
// ==========================================
let tmInterval;
let tmTimeLeft = 25 * 60; // 25 minutes
let isTmRunning = false;
const tmDisplay = document.getElementById('timer');

function updateTimerDisplay() {
    const minutes = Math.floor(tmTimeLeft / 60);
    const seconds = tmTimeLeft % 60;
    tmDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('tmStart').addEventListener('click', () => {
    if (!isTmRunning && tmTimeLeft > 0) {
        isTmRunning = true;
        tmInterval = setInterval(() => {
            tmTimeLeft--;
            updateTimerDisplay();
            if (tmTimeLeft <= 0) {
                clearInterval(tmInterval);
                isTmRunning = false;
                playBeep();
                alert("Pomodoro Complete! Take a break.");
            }
        }, 1000);
    }
});

document.getElementById('tmPause').addEventListener('click', () => {
    isTmRunning = false;
    clearInterval(tmInterval);
});

document.getElementById('tmReset').addEventListener('click', () => {
    isTmRunning = false;
    clearInterval(tmInterval);
    tmTimeLeft = 25 * 60;
    updateTimerDisplay();
});

// Web Audio API for Alarm Sound (No external files needed)
function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1.5); 
}


// ==========================================
// 4. THEME TOGGLE (LocalStorage)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️ Theme';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️ Theme';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙 Theme';
    }
});