import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Taskdetails from "./pages/Taskdetails";
import Settings from "./pages/Settings";
import Taskboard from "./pages/TaskBoard";
import Profile from "./pages/Profiles";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        <Route path="/notfound" element={<Notfound /> } />
        <Route path="/taskdetail" element={<Taskdetails /> } />
        <Route path="/taskboard" element={<Taskboard /> } />
        <Route path="/settings" element={<Settings /> } />
        <Route path="/profile" element={<Profile /> } />
      </Routes>
    </BrowserRouter>
  ) 
}

export default App
