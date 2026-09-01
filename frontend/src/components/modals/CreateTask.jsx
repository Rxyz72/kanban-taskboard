import { useState } from "react";
import { X, Plus } from "lucide-react";
import FileUpload from "../FileUpload";

const CreateTask = ({ onClose, team, onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState("");
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title || !assignee || !category || !priority || !status || !deadline) {
            setError("Please fill in all required fields");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5001/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    assignee,
                    category,
                    priority,
                    status,
                    deadline,
                    attachments: files.map((f) => f.name), // filenames only for now — real upload storage comes later
                    team: team._id,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onTaskCreated(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div onClick={onClose} className="fixed bg-black/30 min-h-screen z-51 w-screen top-0 left-0 flex justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="flex bg-white p-6 rounded-md h-fit w-fit">
                <form onSubmit={handleSubmit} className="flex flex-col w-[600px] gap-3">
                    <div className="flex flex-row gap-2">
                        <Plus />
                        <p className="flex flex-row gap-2 font-bold">New Task</p>
                        <button
                            type="button"
                            className="ml-auto hover:bg-gray-200 cursor-pointer rounded"
                            onClick={onClose}
                        >
                            <X />
                        </button>
                    </div>

                    {error && <p className="text-xs text-red-500">{error}</p>}

                    <input
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl mt-2"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <select
                        className="border-2 border-gray-200 text-gray-700 text-sm focus:outline-none w-full p-3 rounded-xl"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    >
                        <option value="">Select Assignee</option>
                        {team.members.map((member) => (
                            <option key={member.user._id} value={member.user._id}>
                                {member.user.firstname} {member.user.lastname}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border-2 border-gray-200 text-gray-700 text-sm focus:outline-none w-full p-3 rounded-xl"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Testing">Testing</option>
                        <option value="DevOps">DevOps</option>
                    </select>

                    <div className="flex flex-row gap-3">
                        <select
                            className="border-2 border-gray-200 text-gray-700 text-sm focus:outline-none w-full p-3 rounded-xl"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <select
                            className="border-2 border-gray-200 text-gray-700 text-sm focus:outline-none w-full p-3 rounded-xl"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="To Do">To Do</option>
                            <option value="Doing">In Progress</option>
                            <option value="Done">Completed</option>
                        </select>
                    </div>

                    <input
                        className="border-2 border-gray-200 text-gray-700 text-sm focus:outline-none w-full p-3 rounded-xl"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />

                    <textarea
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl resize-none"
                        placeholder="Description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <textarea
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl resize-none"
                        placeholder="Comments"
                        rows="2"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />

                    <FileUpload onFilesChange={setFiles} />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white py-3 text-sm rounded-xl cursor-pointer hover:bg-black/80 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;