import { useState } from "react";

type Stadium = {
  id: number;
  name: string;
  city: string;
  country: string;
  match: string;
  date: string;
  image: string;
};

type TicketChoice = {
  side: string;
  level: string;
  stand: string;
  row: string;
  seat: string;
  count: number;
};

const stadiums: Stadium[] = [
  {
    id: 1,
    name: "NRG Stadium",
    city: "Houston",
    country: "United States",
    match: "پرتغال vs کنگو",
    date: "۱۷ ژوئن ۲۰۲۶",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "NRG Stadium",
    city: "Houston",
    country: "United States",
    match: "پرتغال vs ازبکستان",
    date: "۲۳ ژوئن ۲۰۲۶",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "United States",
    match: "کلمبیا vs پرتغال",
    date: "۲۷ ژوئن ۲۰۲۶",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop",
  },
];

const sides = ["شمالی", "جنوبی", "شرقی", "غربی"];
const levels = ["۱", "۲", "۳", "VIP"];
const stands = ["A", "B", "C", "D", "E", "F"];
const rows = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰"];
const seats = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"];

type Props = {
  userName: string;
  onComplete: (ticket: {
    stadium: Stadium;
    choice: TicketChoice;
  }) => void;
};

export default function Getticket({ userName, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [choice, setChoice] = useState<TicketChoice>({
    side: "",
    level: "",
    stand: "",
    row: "",
    seat: "",
    count: 1,
  });

  const isComplete =
    choice.side && choice.level && choice.stand && choice.row && choice.seat;

  const handleSelectStadium = (id: number) => {
    setSelected(id);
    setShowForm(true);
  };

  const handleBuy = () => {
    const stadium = stadiums.find((s) => s.id === selected)!;
    onComplete({ stadium, choice });
  };

  return (
    <div className="getticket-wrapper">
      <div className="getticket-header">
        <h2>جام جهانی ۲۰۲۶</h2>
        <p>بازی‌های پرتغال در مرحله گروهی — گروه K</p>
      </div>

      <div className="stadium-grid">
        {stadiums.map((s) => (
          <div
            key={s.id}
            className={`stadium-card ${selected === s.id ? "selected" : ""}`}
            onClick={() => handleSelectStadium(s.id)}
          >
            <div className="stadium-image">
              <img src={s.image} alt={s.name} />
              <div className="stadium-image-overlay" />
            </div>
            <div className="stadium-info">
              <h3>{s.match}</h3>
              <p className="stadium-date">{s.date}</p>
              <p className="stadium-venue">{s.name}</p>
              <p className="stadium-city">{s.city}, {s.country}</p>
            </div>
            <div className="stadium-glow" />
            {selected === s.id && (
              <div className="stadium-badge">انتخاب شده ✓</div>
            )}
          </div>
        ))}
      </div>

      {showForm && selected !== null && (
        <div className="ticket-form">
          <h3 className="ticket-form-title">
            انتخاب صندلی — {stadiums.find((s) => s.id === selected)?.match} | خریدار: {userName}
          </h3>

          <div className="ticket-fields">
            <div className="ticket-field">
              <label>ضلع ورزشگاه</label>
              <select
                value={choice.side}
                onChange={(e) => setChoice({ ...choice, side: e.target.value })}
              >
                <option value="">انتخاب کنید</option>
                {sides.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="ticket-field">
              <label>طبقه</label>
              <select
                value={choice.level}
                onChange={(e) => setChoice({ ...choice, level: e.target.value })}
              >
                <option value="">انتخاب کنید</option>
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="ticket-field">
              <label>جایگاه</label>
              <select
                value={choice.stand}
                onChange={(e) => setChoice({ ...choice, stand: e.target.value })}
              >
                <option value="">انتخاب کنید</option>
                {stands.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="ticket-field">
              <label>ردیف</label>
              <select
                value={choice.row}
                onChange={(e) => setChoice({ ...choice, row: e.target.value })}
              >
                <option value="">انتخاب کنید</option>
                {rows.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="ticket-field">
              <label>شماره صندلی</label>
              <select
                value={choice.seat}
                onChange={(e) => setChoice({ ...choice, seat: e.target.value })}
              >
                <option value="">انتخاب کنید</option>
                {seats.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="ticket-field">
              <label>تعداد بلیط</label>
              <select
                value={choice.count}
                onChange={(e) =>
                  setChoice({ ...choice, count: Number(e.target.value) })
                }
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} بلیط</option>
                ))}
              </select>
            </div>
          </div>

          <button
            className={`ticket-buy-btn ${isComplete ? "" : "disabled"}`}
            disabled={!isComplete}
            onClick={handleBuy}
          >
            تکمیل خرید
          </button>
        </div>
      )}
    </div>
  );
}
