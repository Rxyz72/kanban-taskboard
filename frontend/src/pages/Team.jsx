import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import AddMember from "../components/modals/AddMember";
import CreateTeam from "../components/modals/CreateTeam";
import EditMember from "../components/modals/EditMember";

const Team = ({ user, setUser }) => {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    const [newTeam, setNewTeam] = useState(false);
    const [newMember, setNewMember] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const handleNewTeam = () => setNewTeam(true);
    const handleCloseTeam = () => setNewTeam(false);

    const handleNewMember = () => setNewMember(true);
    const handleCloseMember = () => setNewMember(false);

    const handleEditMember = (member) => setEditingMember(member);

    // true only if the logged in user created this team
    const isTeamLeader = team && team.createdBy._id === user._id;

    useEffect(() => {
        const getTeam = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "/api/teams/my-team",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (response.status === 404) {
                    setTeam(null);
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setTeam(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getTeam();
    }, []);

    // simple delete handler — removes a member from the UI list for now
    const handleDeleteMember = (memberUserId) => {
        setTeam((prev) => ({
            ...prev,
            members: prev.members.filter((m) => m.user._id !== memberUserId),
        }));
    };

    return (
        <div className="grid grid-cols-[auto_1fr] bg-[rgb(249,249,243)]">
            <Menubar user={user} setUser={setUser} />
            <div className="flex flex-col flex-1 border border-gray-200 rounded-xl bg-white m-2.5">
                <Navbar user={user} />
                <div className="p-4 flex-1 overflow-y-auto">
                    {loading ? (
                        <></>
                    ) : !team ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <p className="text-lg font-bold mb-2">
                                You are not part of a team
                            </p>

                            <p className="text-sm text-gray-400 mb-4">
                                Create a team to get started.
                            </p>

                            <button
                                onClick={handleNewTeam}
                                className="flex flex-row rounded-md px-3 py-2 items-center bg-black text-sm text-white gap-2"
                            >
                                <Plus className="w-5" />
                                Create Team
                            </button>

                            {newTeam && (
                                <CreateTeam
                                    onClose={handleCloseTeam}
                                    onTeamCreated={(createdTeam) => {
                                        setTeam(createdTeam);
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <>
                            {/* TEAM HEADER */}
                            <div className="flex flex-row items-center justify-between mb-1">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-xl font-bold">
                                        {team.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Created by {team.createdBy.firstname}{" "}
                                        {team.createdBy.lastname}
                                    </p>
                                </div>

                                {isTeamLeader && (
                                    <button
                                        onClick={handleNewMember}
                                        className="flex flex-row rounded-md px-3 py-2 items-center bg-black text-sm text-white gap-2"
                                    >
                                        <Plus className="w-4" />
                                        Add Member
                                    </button>
                                )}
                            </div>

                            {editingMember && (
                                <EditMember
                                    onClose={() => setEditingMember(null)}
                                    teamId={team._id}
                                    member={editingMember}
                                    onMemberUpdated={(updatedTeam) => {
                                        setTeam(updatedTeam);
                                        setEditingMember(null);
                                    }}
                                />
                            )}

                            <p className="text-sm text-gray-500 mb-5">
                                {team.description}
                            </p>

                            {/* MEMBERS TABLE */}
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-left">
                                            <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">
                                                Role
                                            </th>
                                            <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">
                                                Title
                                            </th>
                                            <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-xs uppercase tracking-wide text-black/40 font-medium text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.members.map((member) => (
                                            <tr
                                                key={member.user._id}
                                                className="border-b border-gray-50 last:border-0"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {member.user.firstname}{" "}
                                                    {member.user.lastname}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-black/70">
                                                    {member.role}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-black/70">
                                                    {member.title}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${member.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                                                    >
                                                        {member.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-row items-center justify-end gap-3">
                                                        {isTeamLeader && (
                                                            <>
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditMember(
                                                                            member,
                                                                        )
                                                                    }
                                                                    aria-label="Edit member"
                                                                    className="text-blue-500 hover:text-blue-600"
                                                                >
                                                                    <Pencil className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteMember(
                                                                            member
                                                                                .user
                                                                                ._id,
                                                                        )
                                                                    }
                                                                    aria-label="Remove member"
                                                                    className="text-red-500 hover:text-red-600"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {newMember && (
                                <AddMember
                                    onClose={handleCloseMember}
                                    teamId={team._id}
                                    onMemberAdded={(updatedTeam) =>
                                        setTeam(updatedTeam)
                                    }
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Team;