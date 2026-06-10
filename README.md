# FIFA World Cup 2026 - Stadium Ticket App

React + Vite + TypeScript app for purchasing Portugal group stage tickets.

## Features
- **Login**: Name, phone, national ID validation
- **Stadium Selection**: 3 Portugal Group K matches (NRG Stadium Houston ×2, Hard Rock Stadium Miami)
- **Seat Selection**: Side, level, stand, row, seat, count
- **Receipt**: Printable ticket with all details
- **Clock Bar**: Live clock at top with music toggle
- **Music**: Portugal World Cup song plays on login

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` (or the URL Vite prints).

## Project Structure
```
clock-app/
├── index.html          # Entry HTML
├── main.tsx            # React entry, imports styles
├── App.tsx             # App flow: Login → ClockBar+Getticket → Receipt
├── Login.tsx           # Login form
├── Getticket.tsx       # Stadium + seat selection
├── Receipt.tsx         # Ticket receipt
├── ClockBar.tsx        # Top clock bar with music toggle
├── ClockApp.tsx        # Full clock/stopwatch/timer (unused in flow)
├── ClockApp.css        # All component styles (glassmorphism, animations)
├── index.css           # Root styles
├── public/
│   └── portugal-song.mp3    # Music (served at /portugal-song.mp3)
├── assets/
│   └── Download Portugal World Cup Song by Mason - Listen MP3 & WAV for FREE on audio.com.mp3
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## How It Works
1. **Login** → enter name, phone (09xxxxxxxxx), 10-digit national ID
2. **ClockBar** appears at top with live clock, welcome message, music toggle (🔊/🔇), logout
3. **Getticket** → pick stadium, then seat details
4. **Receipt** → shows ticket with match, stadium, seat, buyer info
5. Click **Back** on receipt to change seat, or **Logout** on clock bar to restart

## Music
- File: `assets/Download Portugal World Cup Song by Mason - Listen MP3 & WAV for FREE on audio.com.mp3`
- Auto-plays on login at 40% volume, loops
- Toggle with 🔊/🔇 button in ClockBar
- Served via Vite from `public/portugal-song.mp3` (copied during setup)

## Styles
- Single CSS file: `ClockApp.css` (imported in `main.tsx`)
- Glassmorphism cards, gradient backgrounds, smooth animations
- Responsive: works on mobile and desktop
- RTL-friendly for Persian content

## Tech Stack
- React 18, TypeScript, Vite 5
- No external UI libraries — pure CSS

## GitHub
```bash
git add .
git commit -m "message"
git push
```

---
Built for 2026 FIFA World Cup Portugal Group K matches.