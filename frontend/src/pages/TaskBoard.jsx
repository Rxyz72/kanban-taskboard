import { useState, useEffect } from "react";
import Menubar from "../components/Menubar";
import { Plus, CheckCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/modals/CreateTask";
import TaskDetailModal from "../components/modals/TaskDetail";

const columns = [
    { key: "To Do", label: "To Do" },
    { key: "Doing", label: "In Progress" },
    { key: "Done", label: "Completed" },
];

const TaskBoard = ({ user, setUser }) => {
    const [team, setTeam] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleNewTask = () => setNewTask(true);
    const handleCloseTask = () => setNewTask(false);
    const isTeamLeader = team && team.createdBy._id === user._id;

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem("token");

            try {
                const teamRes = await fetch(
                    "/api/teams/my-team",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                if (teamRes.status === 404) {
                    setTeam(null);
                    setLoading(false);
                    return;
                }

                const teamData = await teamRes.json();
                setTeam(teamData);

                const tasksRes = await fetch(
                    `/api/tasks/team/${teamData._id}`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                const tasksData = await tasksRes.json();
                setTasks(tasksData);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleTaskCreated = (createdTask) => {
        setTasks((prev) => [...prev, createdTask]);
        setNewTask(false);
    };

    const handleStatusUpdated = (updatedTask) => {
        setTasks((prev) =>
            prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)),
        );
        setSelectedTask(updatedTask);
    };

    return (
        <div className="grid grid-cols-[auto_1fr]">
            <Menubar user={user} setUser={setUser} />
            <div className="flex flex-col flex-1 border border-gray-200 rounded-xl bg-white m-2.5">
                <Navbar user={user} tasks={tasks} />
                <div className="p-2 flex-1 overflow-y-auto bg-[rgb(249,249,243)]">
                    <div className="flex flex-row justify-between text-sm p-2.5 mb-1">
                        <p>Dashboard</p>
                        {team && isTeamLeader && (
                            <button
                                onClick={handleNewTask}
                                className="flex flex-row px-3 py-1 rounded-md pr-3 items-center justify-center cursor-pointer bg-[#BE375F] text-white gap-3"
                            >
                                <Plus className="text-white w-5" />
                                New Task
                            </button>
                        )}
                    </div>

                    {newTask && (
                        <CreateTask
                            onClose={handleCloseTask}
                            team={team}
                            onTaskCreated={handleTaskCreated}
                        />
                    )}

                    {selectedTask && (
                        <TaskDetailModal
                            task={selectedTask}
                            team={team}
                            isTeamLeader={isTeamLeader}
                            onClose={() => setSelectedTask(null)}
                            onStatusUpdated={handleStatusUpdated}
                            onTaskUpdated={(updatedTask) => {
                                setTasks((prev) =>
                                    prev.map((t) =>
                                        t._id === updatedTask._id
                                            ? updatedTask
                                            : t,
                                    ),
                                );
                                setSelectedTask(updatedTask);
                            }}
                            onTaskDeleted={(deletedId) => {
                                setTasks((prev) =>
                                    prev.filter((t) => t._id !== deletedId),
                                );
                                setSelectedTask(null);
                            }}
                        />
                    )}

                    {!loading && !team && (
                        <p className="text-sm text-black/40 italic px-2.5">
                            Join or create a team to see tasks.
                        </p>
                    )}

                    {team && (
                        <div className="flex flex-row h-screen bg-[rgb(249,249,243)]">
                            {columns.map((column) => {
                                const columnTasks = tasks.filter(
                                    (t) => t.status === column.key,
                                );
                                return (
                                    <div
                                        key={column.key}
                                        className="flex flex-col flex-1 w-full min-w-0 h-full rounded-xl p-3"
                                    >
                                        <div className="flex flex-row items-center gap-2 mb-3 bg-gray-100 px-3 py-2 rounded-md">
                                            <p className="text-sm">
                                                {column.label}
                                            </p>
                                            <span className="text-sm bg-gray-200 text-black/60 px-2 py-0.5 rounded-full">
                                                {columnTasks.length}
                                            </span>
                                            <button className="ml-auto cursor-pointer">
                                                <CheckCheck className="w-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {columnTasks.map((task) => (
                                                <TaskCard
                                                    key={task._id}
                                                    task={task}
                                                    onClick={() =>
                                                        setSelectedTask(task)
                                                    }
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
