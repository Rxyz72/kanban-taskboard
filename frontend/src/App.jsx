import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Taskdetails from "./pages/Taskdetails";
import Settings from "./pages/Settings";
import Taskboard from "./pages/TaskBoard";
import Profile from "./pages/Profiles";
import axios from "axios";

import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get("/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                localStorage.removeItem("token");
                setUser(null);
            }
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return (
            <></>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Taskboard user={user} setUser={setUser} />}
                />
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login setUser={setUser} />} />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/"/> : <Register setUser={setUser} />}
                />
                <Route path="/notfound" element={<Notfound />} />
                <Route path="/taskdetail" element={<Taskdetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
