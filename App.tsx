import { useState } from "react";
import ClockBar from "./ClockBar";
import Login from "./Login";
import Getticket from "./Getticket";
import Receipt from "./Receipt";

type User = {
  name: string;
  phone: string;
  nationalId: string;
};

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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [ticket, setTicket] = useState<TicketData | null>(null);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  if (ticket) {
    return (
      <Receipt
        userName={user.name}
        userPhone={user.phone}
        ticket={ticket}
        onBack={() => setTicket(null)}
      />
    );
  }

  return (
    <>
      <ClockBar />
      <Getticket userName={user.name} onComplete={(t) => setTicket(t)} />
    </>
  );
}

export default App;
