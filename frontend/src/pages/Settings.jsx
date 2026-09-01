import { useState, useRef } from "react";
import { Pencil, Moon, Sun, Briefcase } from "lucide-react";
import Profile from "../assets/profile.png";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";

const tasks = [
    { id: 1, name: "Fix login form validation", startDate: "12 Aug 2026", endDate: "24 Aug 2026" },
    { id: 2, name: "Set up Socket.io server", startDate: "10 Aug 2026", endDate: "22 Aug 2026" },
    { id: 3, name: "Design board component", startDate: "13 Aug 2026", endDate: "23 Aug 2026" },
    { id: 4, name: "Write Jest tests for auth", startDate: "15 Aug 2026", endDate: "25 Aug 2026" },
];

const Settings = ({user, setUser}) => {
    const [name, setName] = useState(user.firstname,user.lastname);
    const [editingName, setEditingName] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [avatar, setAvatar] = useState(Profile);
    const [darkMode, setDarkMode] = useState(false);
    const fileInputRef = useRef(null);

    const title = user._id;
    const projectsDone = 12;

    const saveName = () => {
        setName(tempName.trim() || name);
        setEditingName(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(URL.createObjectURL(file));
    };

    return (
        <div className="grid grid-cols-[auto_1fr] bg-[rgb(249,249,243)]">
            <Menubar user={user} setUser={setUser}/>
            <div className="flex flex-col flex-1 border border-gray-200 rounded-xl bg-white m-2.5">
                <Navbar user={user}/>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="w-full flex flex-col gap-6">

                        <div className="w-full flex flex-row items-center gap-4 pb-6 border-b border-gray-100">
                            <div className="relative">
                                <img
                                    src={avatar}
                                    alt=""
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    aria-label="Update profile picture"
                                    className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full hover:bg-black/80 transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-2xl font-semibold" >{user.firstname} {user.lastname}</p>
                                <p className="flex flex-row items-center text-sm text-gray-400 gap-2">
                                    <Briefcase className="w-4"/>
                                    {user._id}
                                </p>
                            </div>

                            <div className="flex flex-col items-center ml-auto pr-2">
                                <p className="text-2xl font-semibold">{projectsDone}</p>
                                <p className="text-xs uppercase tracking-wide text-black/40">Projects Done</p>
                            </div>
                        </div>

                        <div className="w-full flex flex-row items-center justify-between pb-6 border-b border-gray-100">
                            <div className="flex flex-row items-center gap-2 text-sm text-black/70">
                                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                <span>{darkMode ? "Dark mode" : "Light mode"}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDarkMode((prev) => !prev)}
                                className={`w-10 h-6 rounded-full transition-colors relative ${darkMode ? "bg-black" : "bg-gray-200"}`}
                                aria-label="Toggle theme"
                            >
                                <span
                                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? "translate-x-4.5" : "translate-x-0.5"}`}
                                />
                            </button>
                        </div>

                        <div className="w-full border border-gray-100 rounded-xl overflow-hidden">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left">
                                        <th className="px-4 py-3 text-sm uppercase tracking-wide text-black/40 font-medium">Task Name</th>
                                        <th className="px-4 py-3 text-sm uppercase tracking-wide text-black/40 font-medium">Start Date</th>
                                        <th className="px-4 py-3 text-sm uppercase tracking-wide text-black/40 font-medium">End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task.id} className="border-b border-gray-50 last:border-0">
                                            <td className="px-4 py-3 text-sm font-medium">{task.name}</td>
                                            <td className="px-4 py-3 text-sm text-black/60">{task.startDate}</td>
                                            <td className="px-4 py-3 text-sm text-black/60">{task.endDate}</td>
                                        </tr>
                                    ))}
                                    {tasks.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-sm text-black/30 italic">
                                                No tasks
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;