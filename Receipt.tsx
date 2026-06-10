type TicketData = {
  stadium: {
    name: string;
    city: string;
    country?: string;
    match: string;
    date?: string;
  };
  choice: {
    side: string;
    level: string;
    stand: string;
    row: string;
    seat: string;
    count: number;
  };
};

type Props = {
  userName: string;
  userPhone: string;
  ticket: TicketData;
  onBack: () => void;
};

export default function Receipt({ userName, userPhone, ticket, onBack }: Props) {
  return (
    <div className="receipt-wrapper">
      <div className="receipt-card">
        <div className="receipt-header">
          <div className="receipt-logo">⚽</div>
          <h2>رسید خرید بلیط</h2>
          <p className="receipt-subtitle">جام جهانی ۲۰۲۶ — آمریکا، کانادا، مکزیک</p>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-section">
          <h4>اطلاعات بازی</h4>
          <div className="receipt-row">
            <span className="receipt-label">مسابقه:</span>
            <span className="receipt-value">{ticket.stadium.match}</span>
          </div>
          {ticket.stadium.date && (
            <div className="receipt-row">
              <span className="receipt-label">تاریخ:</span>
              <span className="receipt-value">{ticket.stadium.date}</span>
            </div>
          )}
          <div className="receipt-row">
            <span className="receipt-label">ورزشگاه:</span>
            <span className="receipt-value">{ticket.stadium.name}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">شهر:</span>
            <span className="receipt-value">{ticket.stadium.city}{ticket.stadium.country ? `, ${ticket.stadium.country}` : ""}</span>
          </div>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-section">
          <h4>اطلاعات صندلی</h4>
          <div className="receipt-row">
            <span className="receipt-label">ضلع:</span>
            <span className="receipt-value">{ticket.choice.side}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">طبقه:</span>
            <span className="receipt-value">{ticket.choice.level}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">جایگاه:</span>
            <span className="receipt-value">{ticket.choice.stand}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">ردیف:</span>
            <span className="receipt-value">{ticket.choice.row}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">شماره صندلی:</span>
            <span className="receipt-value">{ticket.choice.seat}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">تعداد بلیط:</span>
            <span className="receipt-value">{ticket.choice.count} نفر</span>
          </div>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-section">
          <h4>اطلاعات خریدار</h4>
          <div className="receipt-row">
            <span className="receipt-label">نام:</span>
            <span className="receipt-value">{userName}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">موبایل:</span>
            <span className="receipt-value">{userPhone}</span>
          </div>
        </div>

        <div className="receipt-divider" />

        <div className="receipt-footer">
          <div className="receipt-status">✓ خرید با موفقیت انجام شد</div>
          <div className="receipt-id">
            شماره پیگیری: {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </div>
        </div>

        <button className="receipt-back-btn" onClick={onBack}>
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
