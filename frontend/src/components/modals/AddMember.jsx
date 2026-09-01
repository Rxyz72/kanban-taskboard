import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const AddMember = ({ onClose, teamId, onMemberAdded }) => {
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("");
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userId || !role || !title || !status) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5001/api/teams/${teamId}/members`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userId, role, title, status }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onMemberAdded(data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div onClick={onClose} className="fixed bg-black/30 min-h-screen z-51 w-screen top-0 left-0 flex justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="flex bg-white p-6 rounded-md h-fit w-fit">
                <form onSubmit={handleSubmit} className="flex flex-col w-[400px] gap-3">
                    <div className="flex flex-row gap-2">
                        <Plus />
                        <p className="flex flex-row gap-2 font-bold">New Member</p>
                        <button
                            type="button"
                            className="ml-auto hover:bg-gray-200 cursor-pointer rounded"
                            onClick={onClose}
                        >
                            <X />
                        </button>
                    </div>

                    {error && (
                        <p className="text-xs text-red-500">{error}</p>
                    )}

                    <input
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl"
                        type="text"
                        placeholder="Member Id"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <input
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl"
                        type="text"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                    <input
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <select
                        className="border-2 border-gray-200 text-gray-700 text-sm focus:outline-none w-full p-3 rounded-xl"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white py-3 text-sm rounded-xl cursor-pointer hover:bg-black/80 disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add Member"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMember;