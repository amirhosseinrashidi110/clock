import { useState, useEffect } from "react";

type Props = {
  musicPlaying: boolean;
  onToggleMusic: () => void;
  userName: string;
  onLogout: () => void;
};

export default function ClockBar({ musicPlaying, onToggleMusic, userName, onLogout }: Props) {
  const [now, setNow] = useState<Date>(new Date());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (d: Date): string =>
    d.toLocaleTimeString("en-GB", { hour12: false });

  const formatDate = (d: Date): string =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className={`clock-bar ${expanded ? "expanded" : ""}`}>
      <div className="clock-bar-main" onClick={() => setExpanded(!expanded)}>
        <span className="clock-bar-icon">🕐</span>
        <span className="clock-bar-time">{formatTime(now)}</span>
        <span className="clock-bar-date">{formatDate(now)}</span>
        <button className="music-toggle" onClick={(e) => { e.stopPropagation(); onToggleMusic(); }}>
          {musicPlaying ? "🔊" : "🔇"}
        </button>
        <span className="clock-bar-user">خوش آمدید، {userName}</span>
        <button className="btn-logout" onClick={(e) => { e.stopPropagation(); onLogout(); }}>
          خروج
        </button>
      </div>

      {expanded && (
        <div className="clock-bar-expanded">
          <div className="clock-bar-content">
            <div className="clock-bar-big">{formatTime(now)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
