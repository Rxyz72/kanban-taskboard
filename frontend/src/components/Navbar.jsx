import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

const Navbar = ({user}) => {
    return (
        <nav>
            <div className=" w-full sticky z-50 top-0 border-b rounded-t-xl border-gray-200 bg-white flex flex-row items-center justify-between text-sm h-fit p-2.5 top-0">
                <div className="flex flex-row gap-4 items-center">
                    <p className="">
                        Total Tasks
                        <span className="bg-black/10 px-2 py-1 rounded-xl ml-2">
                            11
                        </span>
                    </p>
                    <p className="">
                        My Tasks
                        <span className="bg-black/10 px-2 py-1 rounded-xl ml-2">
                            3
                        </span>
                    </p>
                </div>
                <div>
                    <input
                        className="bg-black/5 w-100 px-4 py-2 rounded-full"
                        type="text"
                        placeholder="Search"
                    />
                </div>

                <div className="flex flex-row items-center gap-3">
                    {user ? (
                        <>
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
