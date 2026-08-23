import { useState } from "react";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

const initialTasks = [
   { id: 1, title: "Fix login form validation", asignee: "Ruvishan Sankalpa", priority: "Low", deadline: "24 Aug 2026", category: "Frontend", status: "To Do" },
   { id: 2, title: "Set up Socket.io server", asignee: "Anuja Nimsara", priority: "High", deadline: "22 Aug 2026", category: "Backend", status: "To Do" },
   { id: 3, title: "Design board component", asignee: "Kavindu Chathuranga", priority: "Medium", deadline: "23 Aug 2026", category: "UI/UX", status: "Doing" },
   { id: 4, title: "Write Jest tests for auth", asignee: "Senal Mahathanthri", priority: "Low", deadline: "25 Aug 2026", category: "Testing", status: "Doing" },
   { id: 5, title: "Deploy staging environment", asignee: "Tamash Arthaka", priority: "High", deadline: "20 Aug 2026", category: "DevOps", status: "Done" },
   { id: 5, title: "Deploy staging environment", asignee: "Manuja Perera", priority: "Medium", deadline: "20 Aug 2026", category: "DevOps", status: "To Do" },
];

const columns = [
   { key: "To Do", label: "To Do" },
   { key: "Doing", label: "Doing" },
   { key: "Done", label: "Done" },
];

const columnColors = {
   "To Do": "bg-rose-50",
   "Doing": "bg-amber-50",
   "Done": "bg-emerald-50",
};

const TaskBoard = () => {
   const [tasks, setTasks] = useState(initialTasks);

   const handleDelete = (task) => {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
   };

   const handleEdit = (task) => {
      console.log("edit", task); 
   };

   return (
      <div className="flex flex-row">
         <Menubar />
         <div className="flex flex-col flex-1 h-full">
            <Navbar />
            <div className="p-4 flex-1 overflow-y-auto">
               <p className="font-semibold mb-4">Task Board</p>

               <div className="flex flex-row gap-4 h-screen">
                  {columns.map((column) => {
                     const columnTasks = tasks.filter((t) => t.status === column.key);
                     return (
                        <div key={column.key} className={`flex flex-col flex-1 w-full min-w-0 h-full ${columnColors[column.key]} rounded-xl p-3`}>
                             <div className="flex flex-row items-center gap-2 mb-3 px-1">
                                    <p className="text-sm">{column.label}</p>
                                    <span className="text-sm bg-gray-200 text-black/60 px-2 py-0.5 rounded-full">
                                       {columnTasks.length}
                                    </span>
                              </div>

                              <div className="flex flex-col gap-2">
                                    {columnTasks.map((task) => (
                                       <TaskCard
                                          key={task.id}
                                          task={task}
                                          onEdit={handleEdit}
                                          onDelete={handleDelete}
                                       />
                                    ))}
                                    {columnTasks.length === 0 && (
                                       <p className="text-xs text-black/30 italic px-1">No tasks</p>
                                    )}
                              </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TaskBoard;