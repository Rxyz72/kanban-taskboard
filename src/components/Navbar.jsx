import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";
import profile from "../assets/profile.png";

const Navbar = ({ user, tasks }) => {
    const totalTasks = tasks?.length ?? 0;
    const myTasks = tasks?.filter((t) => t.assignee?._id === user?._id).length ?? 0;

    return (
        <nav>
            <div className="w-full sticky z-50 top-0 border-b rounded-t-xl border-gray-200 bg-white flex flex-row items-center justify-between text-sm h-fit p-2.5">
                <div className="flex flex-row gap-4 items-center">
                    {tasks && (
                        <>
                            <p>
                                Total Tasks
                                <span className="bg-black/10 px-2 py-1 rounded-xl ml-2">
                                    {totalTasks}
                                </span>
                            </p>
                            <p>
                                My Tasks
                                <span className="bg-black/10 px-2 py-1 rounded-xl ml-2">
                                    {myTasks}
                                </span>
                            </p>
                        </>
                    )}
                </div>

                <div className="flex flex-row items-center gap-3">
                    {user ? (
                        <>
                            <button
                                type="button"
                                aria-label="Notifications"
                                className="hover:bg-black/5 p-2 rounded-full transition-colors"
                            >
                                <BellRing className="w-4 h-4 text-black/60" />
                            </button>
                            <p className="font-bold">{user.firstname} {user.lastname}</p>
                            <img
                                className="w-7 rounded-2xl shrink-0"
                                src={profile}
                                alt="profile"
                            />
                        </>
                    ) : (
                        <>
                            <p className="font-bold">Welcome!</p>
                            <div className="flex flex-row gap-2">
                                <Link to="/login" className="hover:bg-black/70 bg-black text-white rounded-md px-3 p-1">
                                    Login
                                </Link>
                                <Link to="/register" className="hover:bg-black/70 bg-black text-white rounded-md px-3 py-1">
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;