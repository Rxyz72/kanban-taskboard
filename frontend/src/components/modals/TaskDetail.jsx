import { useState } from "react";
import { X, Users, CalendarDays, LayoutDashboard, Flag, Paperclip, Pencil, Trash2, Download } from "lucide-react";
import Profile from "../../assets/profile.png";

const priorityPill = {
    Low: "text-green-600 bg-green-100",
    Medium: "text-yellow-600 bg-yellow-100",
    High: "text-red-600 bg-red-100",
};

const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "Doing", label: "In Progress" },
    { value: "Done", label: "Completed" },
];

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const TaskDetail = ({ task, team, isTeamLeader, onClose, onStatusUpdated, onTaskUpdated, onTaskDeleted }) => {
    const [status, setStatus] = useState(task.status);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        assignee: task.assignee?._id,
        category: task.category,
        priority: task.priority,
        deadline: task.deadline?.slice(0, 10),
    });

    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `/api/tasks/${task._id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status: newStatus }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onStatusUpdated(data);
        } catch (err) {
            setError(err.message);
            setStatus(task.status);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEdit = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5001/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...editData, status }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onTaskUpdated(data);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this task? This cannot be undone.")) return;

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`/api/tasks/${task._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onTaskDeleted(task._id);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div onClick={onClose} className="fixed bg-black/30 min-h-screen z-51 w-screen top-0 left-0 flex justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white p-6 rounded-md h-fit w-[500px] gap-4">
                {/* header */}
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-row items-center gap-2 flex-wrap">
                        <span className="text-xs px-3 py-1 rounded-md bg-blue-100 text-blue-600">
                            {task.category}
                        </span>
                        <span className={`text-[12px] flex flex-row gap-1 items-center rounded-md px-3 py-1 ${priorityPill[task.priority] ?? priorityPill.Low}`}>
                            <Flag className="w-3" />
                            {task.priority}
                        </span>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        {isTeamLeader && !isEditing && (
                            <>
                                <button onClick={() => setIsEditing(true)} aria-label="Edit task" className="text-blue-500 hover:text-blue-600">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={handleDelete} aria-label="Delete task" className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </>
                        )}
                        <button onClick={onClose} className="hover:bg-gray-200 cursor-pointer rounded" aria-label="Close">
                            <X />
                        </button>
                    </div>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                {isEditing ? (
                    <input
                        className="border-2 border-gray-200 text-lg font-semibold p-2 rounded-lg focus:outline-none"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                ) : (
                    <p className="text-lg font-semibold">{task.title}</p>
                )}

                <div>
                    <p className="text-xs uppercase tracking-wide text-black/40 font-medium mb-1.5">Status</p>
                    <div className="flex flex-row gap-2">
                        {statusOptions.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                disabled={loading}
                                onClick={() => handleStatusChange(opt.value)}
                                className={`text-sm px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50
                                    ${status === opt.value ? "bg-black text-white border-black" : "bg-white text-black/70 border-gray-200 hover:bg-gray-50"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {isEditing ? (
                    <div className="flex flex-col gap-3">
                        <select
                            className="border-2 border-gray-200 text-sm p-2 rounded-lg focus:outline-none"
                            value={editData.assignee}
                            onChange={(e) => setEditData({ ...editData, assignee: e.target.value })}
                        >
                            {team.members.map((m) => (
                                <option key={m.user._id} value={m.user._id}>
                                    {m.user.firstname} {m.user.lastname}
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-row gap-3">
                            <select
                                className="border-2 border-gray-200 text-sm p-2 rounded-lg focus:outline-none w-full"
                                value={editData.category}
                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Testing">Testing</option>
                                <option value="DevOps">DevOps</option>
                            </select>

                            <select
                                className="border-2 border-gray-200 text-sm p-2 rounded-lg focus:outline-none w-full"
                                value={editData.priority}
                                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <input
                            type="date"
                            className="border-2 border-gray-200 text-sm p-2 rounded-lg focus:outline-none"
                            value={editData.deadline}
                            onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                        />

                        <textarea
                            className="border-2 border-gray-200 text-sm p-2 rounded-lg focus:outline-none resize-none"
                            rows="3"
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        />

                        <div className="flex flex-row gap-2">
                            <button
                                onClick={handleSaveEdit}
                                disabled={loading}
                                className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-black/80 disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="border-2 border-gray-200 px-4 py-2 text-sm rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row items-center gap-1.5 text-black/40">
                                    <Users className="w-3.5 h-3.5" />
                                    <p className="text-xs uppercase tracking-wide font-medium">Assignee</p>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <img src={Profile} alt="" className="w-5 h-5 rounded-full object-cover" />
                                    <span className="text-sm">
                                        {task.assignee?.firstname} {task.assignee?.lastname}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row items-center gap-1.5 text-black/40">
                                    <CalendarDays className="w-3.5 h-3.5" />
                                    <p className="text-xs uppercase tracking-wide font-medium">Deadline</p>
                                </div>
                                <p className="text-sm">{formatDate(task.deadline)}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row items-center gap-1.5 text-black/40">
                                    <LayoutDashboard className="w-3.5 h-3.5" />
                                    <p className="text-xs uppercase tracking-wide font-medium">Category</p>
                                </div>
                                <p className="text-sm">{task.category}</p>
                            </div>
                        </div>

                        {task.description && (
                            <div>
                                <p className="text-xs uppercase tracking-wide text-black/40 font-medium mb-1.5">Description</p>
                                <p className="text-sm text-black/70 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                    {task.description}
                                </p>
                            </div>
                        )}

                        {task.attachments?.length > 0 && (
                            <div>
                                <div className="flex flex-row items-center gap-1.5 text-black/40 mb-1.5">
                                    <Paperclip className="w-3.5 h-3.5" />
                                    <p className="text-xs uppercase tracking-wide font-medium">Attachments</p>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {task.attachments.map((file, index) => (
                                        <a
                                            key={index}
                                            href={file.url || "#"}
                                            download
                                            className="flex flex-row items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-3 py-2 text-sm"
                                        >
                                            <span className="truncate">{file.name || file}</span>
                                            <Download className="w-3.5 h-3.5 text-black/40 shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-px bg-gray-100" />
                        <div className="flex flex-row items-center gap-2.5 text-black/50">
                            <img src={Profile} alt="" className="w-6 h-6 rounded-full object-cover" />
                            <span className="text-sm">
                                Assigned by <span className="font-medium text-black">{task.createdBy?.firstname} {task.createdBy?.lastname}</span>
                            </span>
                            <span className="text-black/20">•</span>
                            <span className="text-sm">{formatDate(task.createdAt)}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskDetail;