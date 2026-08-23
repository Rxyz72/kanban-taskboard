import { SquareCheckBig, Menu, LayoutDashboard, UserRoundArrowLeft, UsersRound, BellRing, Settings, LogOut } from "lucide-react";
import profile from "../assets/profile.png";

const Menubar = () => {
   return (
      <>
         <div className=" sticky flex flex-col h-screen bg-white min-h-screen p-5 border-r border-gray-300  w-67">
            <div className="flex flex-row items-center justify-between mb-4">
               <p className="text-2xl font-bold text-red-600">TaskBoard.</p>
               <Menu />
            </div>
            <div className="text-black/80 flex flex-col gap-5 mt-2">
               <div className="flex flex-row gap-2">
                  <LayoutDashboard className="w-5"/>
                  <p>Dashboard</p>
               </div>
               <div className="flex flex-row gap-2">
                  <SquareCheckBig className="w-5"/>
                  <p>My Tasks</p>
               </div>
               <div className="flex flex-row gap-2">
                  <UsersRound className="w-5"/>
                  <p>Team</p>
               </div>
               <div className="flex flex-row gap-2">
                  <BellRing className="w-5"/>
                  <p>Notifications</p>
               </div>
               <div className="flex flex-row gap-2">
                  <UserRoundArrowLeft className="w-5"/>
                  <p>Profile</p>
               </div>
               <div className="flex flex-row gap-2">
                  <Settings className="w-5"/>
                  <p>Settings</p>
               </div>
               <hr className="text-gray-200 my-1" />
               <div className="flex flex-row bg-black/5 p-2 rounded-full gap-2 items-center">
                  <img className="w-5 rounded-full" src={profile} alt="profile"/>
                  <p>Chamishka Dilshara</p>
               </div>
            </div>


            <div className="flex flex-row items-center bg-black/90 text-white mt-auto gap-2 px-3 hover:bg-black/50 duration-300 py-2 border bottom-0 border-gray-200 rounded-3xl">
               <LogOut className="w-5 rotate-180"/>
               <button type="button">Logout</button>
            </div>
         </div>
      </>
   );
}

export default Menubar;