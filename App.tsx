import { useState } from "react";
import ClockApp from "./ClockApp";
import Login from "./Login";

type User = {
  name: string;
  phone: string;
  nationalId: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <>
      <div className="user-bar">
        <span>خوش آمدید، {user.name}</span>
        <button className="btn secondary" onClick={() => setUser(null)}>
          خروج
        </button>
      </div>
      <ClockApp />
    </>
  );
}

export default App;
