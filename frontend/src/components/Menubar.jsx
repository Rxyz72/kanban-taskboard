import { Link, useNavigate } from "react-router-dom";
import {
    SquareCheckBig,
    Menu,
    LayoutDashboard,
    UserRoundArrowLeft,
    UsersRound,
    BellRing,
    Settings,
    LogOut,
} from "lucide-react";
import profile from "../assets/profile.png";

const Menubar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <>
            <div className=" sticky flex flex-col w-[250px] h-screen self-start top-0 p-4">
                <div className="flex flex-row items-center justify-between mb-4">
                    <Link to="/" className="text-2xl font-bold text-red-600">
                        TaskBoard.
                    </Link>
                    <Menu className="hover:bg-gray-200 rounded cursor-pointer" />
                </div>
                <div className="text-[rgb(36,36,36)] text-sm flex flex-col gap-4 mt-2">
                    <Link to="/" className="flex flex-row items-center gap-2">
                        <LayoutDashboard className="w-4" />
                        Dashboard
                    </Link>
                    <Link to="/" className="flex flex-row items-center gap-2">
                        <UsersRound className="w-4" />
                        My Tasks
                    </Link>
                    <Link to="/team" className="flex flex-row items-center gap-2">
                        <UsersRound className="w-4" />
                        Team
                    </Link>
                    <Link to="/team" className="flex flex-row items-center gap-2">
                        <UserRoundArrowLeft className="w-4" />
                        Profile
                    </Link>
                    <Link to="/settings" className="flex flex-row items-center gap-2">
                        <Settings className="w-4" />
                        Settings
                    </Link>
                    <hr className="text-[rgba(120,120,120,0.3)] mb-3" />
                </div>

                <div>
                    {user ? (
                        <>
                            <div className="flex flex-row bg-white text-sm p-2 rounded-md gap-2 items-center mb-3">
                                <img
                                    className="w-6 rounded-full"
                                    src={profile}
                                    alt="profile"
                                />
                                <p className="text-black">{user.firstname} {user.lastname}</p>
                            </div>
                            <div className="flex flex-row items-center text-sm bg-black text-white p-2 rounded-md gap-2">
                                <LogOut className="w-4 rotate-180" />
                                <button onClick={handleLogout} className="cursor-pointer w-full text-left" type="button">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 text-sm mt-5"></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Menubar;
