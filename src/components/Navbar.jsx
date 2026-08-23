import { BadgePlus } from "lucide-react"; 
import profile from "../assets/profile.png"
const Navbar = () => {
   return (
      <>
         <div className=" w-full sticky border-b border-gray-300 bg-black/2 flex flex-row items-center justify-between h-fit p-4 top-0">
            <div className="flex flex-row gap-4 items-center">
               <p className="">Total Tasks 
                  <span className="bg-black/10 px-2 py-1 rounded-xl ml-2">11</span>
               </p>
               <p className="">My Tasks
                  <span className="bg-black/10 px-2 py-1 rounded-xl ml-2">3</span>
               </p>
            </div>
            <div>
               <input className="bg-black/5 w-100 px-4 py-2 rounded-full" type="text" placeholder="Search" />
            </div>
            <div className="flex flex-row gap-2 pr-2 items-center w-fit">
               <div className="flex flex-row px-3 py-1 rounded-full hover:bg-black/10 gap-3">
                  <BadgePlus className="text-black/80 w-5"/>
                  <button>Create</button>
               </div>
               <div className="flex flex-row items-center -space-x-1.5">
                  <img className="w-8 rounded-2xl shrink-0" src={profile} alt="profile" />
                  <img className="w-8 rounded-2xl shrink-0" src={profile} alt="profile" />
                  <img className="w-8 rounded-2xl shrink-0" src={profile} alt="profile" />
                  <img className="w-8 rounded-2xl shrink-0" src={profile} alt="profile" />
               </div>
            </div>
         </div>
      </>
   );
}

export default Navbar;