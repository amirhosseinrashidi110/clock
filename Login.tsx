import { useState } from "react";

type User = {
  name: string;
  phone: string;
  nationalId: string;
};

type Props = {
  onLogin: (user: User) => void;
};

export default function Login({ onLogin }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("نام را وارد کنید");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("شماره موبایل معتبر وارد کنید");
      return;
    }
    if (!nationalId.trim() || nationalId.length < 10) {
      setError("کد ملی معتبر وارد کنید");
      return;
    }

    onLogin({ name: name.trim(), phone: phone.trim(), nationalId: nationalId.trim() });
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg-orb login-orb-1" />
      <div className="login-bg-orb login-orb-2" />

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-icon">⚽</div>
        <h2 className="login-title">ورود به سامانه خرید بلیط</h2>
        <p className="login-subtitle">جام جهانی ۲۰۲۲ قطر</p>

        <div className="login-fields">
          <div className="login-field">
            <label>نام و نام خانوادگی</label>
            <input
              type="text"
              placeholder="مثال: علی رضایی"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>شماره موبایل</label>
            <input
              type="tel"
              placeholder="09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
            />
          </div>

          <div className="login-field">
            <label>کد ملی</label>
            <input
              type="text"
              placeholder="1234567890"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              maxLength={10}
            />
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button className="login-btn" type="submit">
          ورود
        </button>

        <p className="login-footer-text">
          با ورود، شما شرایط استفاده را می‌پذیرید
        </p>
      </form>
    </div>
  );
}
