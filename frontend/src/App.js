import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/home/Homepage";
import { Room } from "./pages/room/Room";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";
import { LoggedUserDashboard } from "./pages/user/loggedUserDashboard/LoggedUserDashboard";
import { SessionHolder } from "./utilities/SessionHolder";

function App() {
  return (
    <SessionHolder>
      <div className="h-92 bg-gradient-to-r bg-zinc-50 App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={<LoggedUserDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SessionHolder>
  );
}

export default App;
