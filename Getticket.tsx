import { useState } from "react";

type Stadium = {
  id: number;
  name: string;
  city: string;
  match: string;
  gradient: string;
};

const stadiums: Stadium[] = [
  {
    id: 1,
    name: "Lusail Stadium",
    city: "Lusail",
    match: "پرتغال vs غنا",
    gradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  {
    id: 2,
    name: "Education City Stadium",
    city: "Al Rayyan",
    match: "پرتغال vs اروگوئه",
    gradient: "linear-gradient(135deg, #1a0033, #4a0080, #7b00cc)",
  },
  {
    id: 3,
    name: "Stadium 974",
    city: "Doha",
    match: "پرتغال vs کره جنوبی",
    gradient: "linear-gradient(135deg, #1c0000, #6b0000, #cc0000)",
  },
];

type Props = {
  userName: string;
};

export default function Getticket({ userName }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="getticket-wrapper">
      <div className="getticket-header">
        <h2>انتخاب استادیوم</h2>
        <p>بازی‌های پرتغال در جام جهانی ۲۰۲۲ قطر</p>
      </div>

      <div className="stadium-grid">
        {stadiums.map((s) => (
          <div
            key={s.id}
            className={`stadium-card ${selected === s.id ? "selected" : ""}`}
            style={{ background: s.gradient }}
            onClick={() => setSelected(s.id)}
          >
            <div className="stadium-icon">🏟️</div>
            <div className="stadium-info">
              <h3>{s.name}</h3>
              <p className="stadium-city">{s.city}</p>
              <p className="stadium-match">{s.match}</p>
            </div>
            <div className="stadium-glow" />
            {selected === s.id && (
              <div className="stadium-badge">انتخاب شده ✓</div>
            )}
          </div>
        ))}
      </div>

      {selected !== null && (
        <button className="btn primary getticket-btn">
          خرید بلیط برای {userName}
        </button>
      )}
    </div>
  );
}
