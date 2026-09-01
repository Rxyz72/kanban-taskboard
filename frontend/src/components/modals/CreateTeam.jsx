import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const CreateTeam = ({ onClose, onTeamCreated }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submit");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5001/api/teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onTeamCreated(data);
            onClose();

        } catch (error) {
            console.error("Error creating team:", error.message);
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed bg-black/30 min-h-screen z-51 w-screen top-0 left-0 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex bg-white p-6 rounded-md h-fit w-fit"
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-[500px] gap-3"
                >
                    <div className="flex flex-row gap-2">
                        <Plus />
                        <p className="font-bold">New Team</p>

                        <button
                            type="button"
                            className="ml-auto hover:bg-gray-200 cursor-pointer rounded"
                            onClick={onClose}
                        >
                            <X />
                        </button>
                    </div>

                    <input
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl mt-2"
                        type="text"
                        placeholder="Team Title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        className="border-2 border-gray-200 placeholder:text-gray-700 placeholder:text-sm focus:outline-none w-full p-3 rounded-xl resize-none"
                        placeholder="Description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-3 text-sm rounded-xl cursor-pointer hover:bg-black/80"
                    >
                        Create Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTeam;
