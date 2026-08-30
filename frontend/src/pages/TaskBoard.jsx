import { useState } from "react";
import Menubar from "../components/Menubar";
import { Plus, CheckCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/modals/CreateTask";

const initialTasks = [
    {
        id: 1,
        title: "Fix login form validation",
        asignee: "Ruvishan Sankalpa",
        priority: "Low",
        deadline: "24 Aug 2026",
        category: "Frontend",
        status: "To Do",
    },
    {
        id: 2,
        title: "Set up Socket.io server",
        asignee: "Anuja Nimsara",
        priority: "High",
        deadline: "22 Aug 2026",
        category: "Backend",
        status: "To Do",
    },
    {
        id: 3,
        title: "Design board component",
        asignee: "Kavindu Chathuranga",
        priority: "Medium",
        deadline: "23 Aug 2026",
        category: "UI/UX",
        status: "Doing",
    },
    {
        id: 4,
        title: "Write Jest tests for auth",
        asignee: "Senal Mahathanthri",
        priority: "Low",
        deadline: "25 Aug 2026",
        category: "Testing",
        status: "Doing",
    },
    {
        id: 5,
        title: "Deploy staging environment",
        asignee: "Tamash Arthaka",
        priority: "High",
        deadline: "20 Aug 2026",
        category: "DevOps",
        status: "Done",
    },
    {
        id: 5,
        title: "Deploy staging environment",
        asignee: "Manuja Perera",
        priority: "Medium",
        deadline: "20 Aug 2026",
        category: "DevOps",
        status: "To Do",
    },
];

const columns = [
    { key: "To Do", label: "To Do" },
    { key: "Doing", label: "Doing" },
    { key: "Done", label: "Done" },
];

const TaskBoard = ({user, setUser}) => {
    const [tasks, setTasks] = useState(initialTasks);

    const handleDelete = (task) => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
    };

    const handleEdit = (task) => {
        console.log("edit", task);
    };

    const [newTask, setNewTask] = useState(false);

    const handleNewTask = () => {
        setNewTask(true);
    }

    const handleCloseTask = () => {
        setNewTask(false);
    }


    return (
        <div className="grid grid-cols-[auto_1fr]">
            {/* <CreateTask/> */}
            <Menubar user={user} setUser={setUser}/>
            <div className="flex flex-col flex-1 border border-gray-200 rounded-xl bg-white m-2.5">
                <Navbar user={user}/>
                <div className="p-2 flex-1 overflow-y-auto bg-[rgb(249,249,243)]">
                    <div className="flex flex-row justify-between text-sm p-2.5 mb-1">
                        <p>Dashboard</p>
                        <button onClick={handleNewTask} className="flex flex-row px-3 py-1 rounded-md pr-3 items-center justify-center cursor-pointer bg-[#BE375F] text-white gap-3">
                            <Plus className="text-white w-5" />
                            New Task
                        </button>
                    </div>

                    {newTask && (
                        <CreateTask onClose={handleCloseTask}/>
                    )}

                    <div className="flex flex-row h-screen bg-[rgb(249,249,243)]">
                        {columns.map((column) => {
                            const columnTasks = tasks.filter(
                                (t) => t.status === column.key,
                            );
                            return (
                                <div
                                    key={column.key}
                                    className={`flex flex-col flex-1 w-full min-w-0 h-full rounded-xl p-3`}
                                >
                                    <div className="flex flex-row items-center gap-2 mb-3 bg-gray-100 px-3 py-2 rounded-md">
                                        <p className="text-sm">
                                            {column.label}
                                        </p>
                                        <span className="text-sm bg-gray-200 text-black/60 px-2 py-0.5 rounded-full">
                                            {columnTasks.length}
                                        </span>
                                        <button className="ml-auto cursor-pointer">
                                            <CheckCheck className=" w-5" />
                                        </button>
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
                                            <p className="text-xs text-black/30 italic px-1">
                                                No tasks
                                            </p>
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
