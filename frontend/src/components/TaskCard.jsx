import { useState } from "react";
import { Paperclip, CalendarDays, Flag, MessageCircle } from "lucide-react";
import Profile from "../assets/profile.png";

const priorityPill = {
    Low: "text-green-600 bg-green-100",
    Medium: "text-yellow-500 bg-yellow-100",
    High: "text-red-600 bg-red-100",
};

const TaskCard = ({ task }) => {
    return (
        <div className="relative bg-white rounded-xl border border-gray-200 hover:scale-102 transition-all overflow-hidden cursor-pointer">
            <div className="p-3">
                <div className="flex flex-row items-center gap-2 mb-2.5">
                    <span className="text-xs px-3 py-1 rounded-md bg-blue-100 text-blue-600">
                        {task.category}
                    </span>
                    <span
                        className={`text-[12px] flex flex-row gap-1 items-center rounded-md px-3 ${priorityPill[task.priority] ?? priorityPill.Low}`}
                    >
                        <Flag className="w-3 " />
                        {task.priority}
                    </span>
                </div>

                <p className="font-medium text-black/90 my-4 leading-snug">
                    {task.title}
                </p>

                <div className="h-px bg-gray-100 mb-3" />

                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center -space-x-1.5">
                        <img
                            src={Profile}
                            alt=""
                            className="w-5 h-5 rounded-full "
                        />
                        <img
                            src={Profile}
                            alt=""
                            className="w-5 h-5 rounded-full"
                        />
                        <img
                            src={Profile}
                            alt=""
                            className="w-5 h-5 rounded-full"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center gap-1 text-black/40">
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{task.deadline}</span>
                        </div>

                        <div className="flex flex-row gap-1 items-center text-black/40">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span className="text-xs">2</span>
                        </div>

                        <div className="flex flex-row gap-1 items-center text-black/40">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="text-xs">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
