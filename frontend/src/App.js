import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/home/Homepage";
import { Room } from "./pages/room/Room";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/auth/login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
