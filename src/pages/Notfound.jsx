import { useNavigate } from "react-router-dom";

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center flex-col bg-white h-screen gap-2">
            <p className="text-8xl text-black font-extrabold scale-y-200 mb-8 hover:text-purple-600 duration-400">
                404
            </p>
            <p className="text-black text-2xl font-semibold">
                Page Not Found!
            </p>
            <p className="text-black">
                Sorry, we can't find the page you're looking for.
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-black text-white font-semibold p-2 w-50 rounded hover:bg-black/29 duration-300"
                type="button"
            >
                Back to home
            </button>
        </div>
    );
};

export default Notfound;