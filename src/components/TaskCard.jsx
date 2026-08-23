import { useState } from "react";
import { MoreVertical, CalendarDays, Flag } from "lucide-react";
import Profile from "../assets/profile.png";

const priorityPill = {
   Low: "text-green-600",
   Medium: "text-yellow-500",
   High: "text-red-600",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
   <div className="relative bg-white rounded-xl border border-gray-100 hover:-translate-y-0.5 transition-all overflow-hidden">
      <div className="p-3">
         <div className="flex flex-row items-center justify-between mb-2.5">
            <span className="text-sm px-3 py-0.5 rounded-full bg-blue-100 text-blue-500">
               {task.category}
            </span>
            <span className={`text-[12px] flex flex-row gap-1 items-center px-3 py-0.5 rounded-full ${priorityPill[task.priority] ?? priorityPill.Low}`}>
               <Flag className="w-4 "/>{task.priority}
            </span>
         </div>

         <p className="font-medium text-black/90 my-4 leading-snug">{task.title}</p>

         <div className="h-px bg-gray-100 mb-3" />

         <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1.5">
               <img src={Profile} alt="" className="w-5 h-5 rounded-full object-cover ring-2 ring-white shadow-sm" />
               <span className="text-xs text-black/60 font-medium">{task.asignee}</span>
            </div>

            <div className="flex flex-row items-center gap-2">
               <div className="flex flex-row items-center gap-1 text-black/40">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{task.deadline}</span>
               </div>

               <div className="relative">
                  <button
                     type="button"
                     onClick={() => setMenuOpen((prev) => !prev)}
                     className="text-black/30 hover:text-black hover:bg-gray-100 rounded p-0.5 transition-colors"
                     aria-label="Task options"
                  >
                  <MoreVertical className="w-4 h-4" />
                  </button>

                  {menuOpen && (
                     <div className="absolute right-0 bottom-6 bg-white border border-gray-100 rounded-lg shadow-md py-1 w-28 z-10">
                        <button
                              type="button"
                              onClick={() => { setMenuOpen(false); onEdit?.(task); }}
                              className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50"
                        >
                              Edit
                        </button>
                        <button
                              type="button"
                              onClick={() => { setMenuOpen(false); onDelete?.(task); }}
                              className="w-full text-left px-3 py-1.5 text-sm text-red-500 hover:bg-red-50"
                        >
                              Delete
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
      </div>
   );
};

export default TaskCard;