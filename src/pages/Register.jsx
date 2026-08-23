import React from "react";
import registerImage from "../assets/img_register.jpg";

const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <div className="flex flex-row items-center justify-center w-fit h-[80vh] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-3xl p-2">
                <div className="w-fit h-full">
                    <img className="h-full rounded-2xl" src={registerImage} alt="Register" />
                </div>
                <div className="w-110 h-fit p-8 text-center">
                        <p className="text-4xl font-semibold mb-2">
                            Create an account
                        </p>
                        <p className="mb-6">
                            <span className="text-sm">Already have an account? </span>
                            <a className="text-sm text-gray-700 underline"
                                href="/login">Login
                            </a>
                        </p>
                    <form className="flex flex-col gap-0">
                        <div className="flex gap-6 mb-6">
                            <input className="flex-1 bg-gray-200 text-black placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-1/2 p-3 rounded" 
                                type="text" 
                                id="first-name" 
                                name="first-name" 
                                placeholder="First Name"
                                required  
                            />
                            <input className="flex-1 bg-gray-200 text-black placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-1/2 p-3 rounded"
                                type="text" 
                                id="last-name" 
                                name="last-name" 
                                required 
                                placeholder="Last Name" 
                            />
                        </div>
                            <input className="bg-gray-200 text-black placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded"
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email"
                                required
                            /><br />
                            <input className="bg-gray-200 text-black placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded"
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                placeholder="Enter your password" 
                            /><br />
                            <div className="mb-2">
                                <input className="accent-black"
                                    type="checkbox" 
                                    id="terms" 
                                    name="terms" 
                                    required 
                                />
                                <label className="ml-1 text-sm"
                                htmlFor="terms">
                                I agree to the <a href="/terms">Terms and Conditions</a>
                                </label>
                            </div>                    
                            <button className="p-3 text-sm font-medium rounded w-full bg-black text-white"
                                type="submit">Create account</button>
                    </form>
                </div>
            </div>
        </div>
    );
} 

export default Register;