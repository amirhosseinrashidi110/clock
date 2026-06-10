import { useState } from "react";
import Login from "./Login";
import Getticket from "./Getticket";

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
      <Getticket userName={user.name} />
    </>
  );
}

export default App;
