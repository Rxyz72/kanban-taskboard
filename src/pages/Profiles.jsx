import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Profile from "../assets/profile.png";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";

const initialMembers = [
    { id: 1, name: "Kavindu Chathuranga", role: "Frontend Developer", title: "Team Lead", active: true },
    { id: 2, name: "Tamash Arthaka", role: "Backend Developer", title: "Member", active: true },
    { id: 3, name: "Ruvishan Sankalpa", role: "UI/UX Designer", title: "Member", active: false },
    { id: 4, name: "Chamishka Dilshara", role: "QA Engineer", title: "Member", active: true },
];

const Team = () => {
    const [members, setMembers] = useState(initialMembers);

    const handleDelete = (id) => {
        setMembers((prev) => prev.filter((m) => m.id !== id));
    };

    const handleEdit = (member) => {
        console.log("edit", member); // hook up to an edit modal later
    };

    return (
        <div className="flex flex-row">
            <Menubar />
            <div className="flex flex-col flex-1 h-full">
                <Navbar />
                <div className="p-4 flex-1 overflow-y-auto">
                    <p className="text-xl font-semibold mb-4">Team</p>

                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-left">
                                    <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">Name</th>
                                    <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">Role</th>
                                    <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">Title</th>
                                    <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">Status</th>
                                    <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.id} className="border-b border-gray-50 last:border-0">
                                        <td className="px-4 py-3">
                                            <div className="flex flex-row items-center gap-2">
                                                <img src={Profile} alt="" className="w-8 h-8 rounded-full object-cover" />
                                                <span className="text-sm font-medium">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-black/70">{member.role}</td>
                                        <td className="px-4 py-3 text-sm text-black/70">{member.title}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${member.active ? "bg-green-100 text-green-500" : "bg-gray-100 text-gray-500"}`}>
                                                {member.active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-row items-center justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(member)}
                                                    aria-label={`Edit ${member.name}`}
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(member.id)}
                                                    aria-label={`Delete ${member.name}`}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {members.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-black/30 italic">
                                            No team members
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;