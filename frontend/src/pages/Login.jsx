import { useState } from "react";
import loginImage from "../assets/img_login.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
    const [formData, setformData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlechange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/login", formData);
            localStorage.setItem("token", res.data.token);
            // console.log(res.data);
            setUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <div className="flex flex-row items-center justify-center w-fit h-[80vh] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-3xl p-2">
                <div className="w-fit h-full">
                    <img
                        className="h-full rounded-2xl"
                        src={loginImage}
                        alt="Login"
                    />
                </div>
                <div className=" w-110 h-fit p-8 text-center">
                    <p className="text-4xl font-semibold mb-2">Sign in</p>
                    <p className="mb-6">
                        <span className="text-sm">Don't have an account? </span>
                        <a className="text-sm underline" href="/register">
                            Create account
                        </a>
                    </p>
                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-0"
                    >
                        <input
                            className="bg-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handlechange}
                            placeholder="Email"
                            autoComplete="off"
                            required
                        />
                        <br />
                        <input
                            className="bg-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handlechange}
                            placeholder="Enter your password"
                            required
                        />
                        <br />
                        <button
                            className="p-3 text-sm font-medium rounded w-full bg-black text-white"
                            type="submit"
                        >
                            Login
                        </button>
                        <a
                            className="text-sm underline mt-4 text-center"
                            id="forgot-password"
                            href="/forgot-password"
                        >
                            Forgot password?
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
