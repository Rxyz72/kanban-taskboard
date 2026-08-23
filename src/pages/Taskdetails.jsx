import { Trash2, Loader, Users, CalendarDays, Flag, LayoutDashboard, OctagonAlert, MessagesSquare, FileText, X } from "lucide-react";
import Profile from "../assets/profile.png";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";

const Taskdetails = () => {

   const task = {
      title: "Fix login form validation",
      status: "In Progress",  // 1 - To do, 2 - Doing, 3 - Done
      deadline: "24 August 2026 at 12:00 PM",
      asignee: "Tamash Arthaka",
      category: "Frontend",
      priority: "Low",
      desription: "Implement client-side validation for the login form to ensure that users provide valid and complete information before submitting their credentials. The email field should check for a valid email format, while the password field should ensure that the required minimum length and other password requirements are met. Appropriate error messages should be displayed below each field when the entered information is invalid or missing. The validation should update as the user interacts with the form and should prevent submission until all required fields are valid. The implementation should also maintain a clean and responsive layout across desktop, tablet, and mobile screen sizes.",
      created_by: "Jacob Adams",
      comments: "Make sure the validation works on both desktop and mobile screen sizes.",
      created_date: "August 12, 2026 at 09:00 AM",
   };

   return (
      <div className="flex flex-row ">
         <Menubar/>
         <div className="flex flex-col flex-1 h-full">
            <Navbar />
            <div className="p-4 flex-1">
               <div className="p-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                  <div className="w-full flex flex-row items-center justify-between">
                     <p className="mb-2">Task Detail</p>
                     <div className="flex flex-row items-center gap-2">
                        <Trash2 className="text-red-500"/>
                        <button className="border-2 border-gray-200 px-3 py-1 rounded-lg" type="button">Finish Task</button>
                        <X />
                     </div>
                  </div>
                  <p className="text-xl font-semibold">{task.title}</p>
                  <div className="flex flex-row justify-between gap-10 h-full">
                     <table className="border-spacing-y-4 shrink-0 border-separate ">
                        <tr className="align-middle">
                           <td className="flex flex-row items-center gap-2 pr-17">
                              <Loader strokeWidth={3} className="w-4 text-black/55" />
                              <p className="text-black/55">Status</p>
                           </td>
                           <td>
                              <p className="rounded-lg w-fit px-4 text-orange-400 bg-orange-100">{task.status}</p>
                           </td>
                        </tr>
                        <tr>
                           <td className="flex flex-row items-center gap-2">
                              <Users strokeWidth={2.5} className="w-4 text-black/55"/>
                              <p className="text-black/55">Asigne</p>
                           </td>
                           <td>
                              <div className="flex flex-row items-center gap-2 rounded-xl">
                                 <img className="w-5 rounded-xl" src={Profile} alt="profile" />
                                 <p>{task.asignee}</p>   
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td className="flex flex-row items-center gap-2">
                              <CalendarDays strokeWidth={2.5} className="text-black/55 w-4" />
                              <p className="text-black/55">Date & time</p>
                           </td>
                           <td>
                              {task.deadline}
                           </td>
                        </tr>
                        <tr>
                           <td className="flex flex-row items-center gap-2">
                              <LayoutDashboard strokeWidth={2.5} className="text-black/55 w-4"/>
                              <p className="text-black/55">Category</p>
                           </td>
                           <td>
                              {task.category}
                           </td>
                        </tr>
                        <tr>
                           <td className="flex flex-row items-center gap-2">
                              <Flag strokeWidth={2.5} className="text-black/55 w-4" />
                              <p className="text-black/55">Priority</p>
                           </td>
                           <td>
                              <div className="flex flex-row gap-1.5 w-fit px-2 bg-green-50 rounded-xl">
                                 <OctagonAlert strokeWidth={2.5} className="w-4 text-green-600"/>
                                 <p className="text-green-600">
                                    {task.priority} 
                                 </p>
                              </div>
                           </td>
                        </tr>
                     </table>
                     <div className="flex-1 min-w-0">
                        <FileUpload taskTitle={task.title}/>
                     </div>
                  </div>
                  
                  <hr className="text-gray-200 border-t-2" />
                  
                  <div className="flex flex-row  gap-2 mt-4 w-fit">
                     <FileText strokeWidth={2.5} className="w-4 text-black/55"/>
                     <p className="font-semibold">Description</p>
                  </div>

                  <p className="w-full border-2 p-2 rounded-xl border-gray-200 py-3 mt-2">{task.desription}</p>

                  <div className="flex flex-row  gap-2 mt-4 w-ft">
                     <MessagesSquare strokeWidth={2.5} className="w-4 text-black/55"/>
                     <p className="font-semibold">Comments</p>
                  </div>

                  <p className="w-full border-2 p-2 rounded-xl border-gray-200 py-3 mt-2">{task.comments}</p>

                  <hr className="border-t-2 text-gray-200 mt-4" />

                  <div className="flex flex-row items-center gap-2 mt-5 bg-gray-100 p-2 rounded-xl">
                     <img src={Profile} alt="profile" className="w-5 rounded-2xl" />
                     <p className="font-semibold">{task.created_by}</p>
                     <p className="text-black/55 text-sm">{task.created_date}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Taskdetails;