import { useState, useEffect } from "react";

type Mode = "clock" | "stopwatch" | "timer";

export default function ClockBar() {
  const [now, setNow] = useState<Date>(new Date());
  const [mode, setMode] = useState<Mode>("clock");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (d: Date): string =>
    d.toLocaleTimeString("en-GB", { hour12: false });

  const formatShort = (d: Date): string =>
    d.toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`clock-bar ${expanded ? "expanded" : ""}`}>
      <div className="clock-bar-main" onClick={() => setExpanded(!expanded)}>
        <span className="clock-bar-icon">🕐</span>
        <span className="clock-bar-time">{mode === "clock" ? formatTime(now) : formatShort(now)}</span>
        <span className="clock-bar-date">{now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
        <span className="clock-bar-expand">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="clock-bar-expanded">
          <div className="clock-bar-tabs">
            <button
              className={`clock-bar-tab ${mode === "clock" ? "active" : ""}`}
              onClick={() => setMode("clock")}
            >
              🕐 ساعت
            </button>
            <button
              className={`clock-bar-tab ${mode === "stopwatch" ? "active" : ""}`}
              onClick={() => setMode("stopwatch")}
            >
              ⏱ کرنومتر
            </button>
            <button
              className={`clock-bar-tab ${mode === "timer" ? "active" : ""}`}
              onClick={() => setMode("timer")}
            >
              ⏰ تایمر
            </button>
          </div>

          {mode === "clock" && (
            <div className="clock-bar-content">
              <div className="clock-bar-big">{formatTime(now)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
