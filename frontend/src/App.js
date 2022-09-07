import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/home/Homepage";
import { Room } from "./pages/room/Room";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";
import { LoggedUserDashboard } from "./pages/user/loggedUserDashboard/LoggedUserDashboard";
import { DifferentUserDashboard } from "./pages/user/differentUserDashboard/DifferentUserDashboard";
import { SessionHolder } from "./utilities/SessionHolder";
import { Inbox } from "./pages/user/loggedUserDashboard/inbox/Inbox";
import { MessageDashboard } from "./pages/user/messagesService/MessageDashboard";
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
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/user/:id" element={<DifferentUserDashboard />} />
            <Route path="/message/:id" element={<MessageDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SessionHolder>
  );
}

export default App;
