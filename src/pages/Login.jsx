import React from "react";
import {useState} from "react";
import loginImage from "../assets/img_login.jpg";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const loginHandler = (e) => {
      alert(`This is my ${email} ${password}`);
   }

   return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
         <div className="flex flex-row items-center justify-center w-fit h-[80vh] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-3xl p-2">
            <div className="w-fit h-full">
               <img className="h-full rounded-2xl" src={loginImage} alt="Login" />
            </div>
            <div className=" w-110 h-fit p-8 text-center">
               <p className="text-4xl font-semibold mb-2">
                  Sign in
               </p>
               <p className="mb-6">
                  <span className="text-sm">Don't have an account? </span>
                  <a className="text-sm underline"
                     href="/register">
                     Create account
                  </a>
               </p>
               <form className="flex flex-col gap-0">
                  <input className="bg-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded" 
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email"
                     required
                  /><br />
                  <input className="bg-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded"
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Enter your password" 
                     required
                  /><br />
                  <button  className="p-3 text-sm font-medium rounded w-full bg-black text-white"
                     onClick={loginHandler}
                     type="submit">Login
                  </button>
                  <a className="text-sm underline mt-4 text-center"
                     id="forgot-password"
                     href="/forgot-password">
                        Forgot password?
                  </a>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;