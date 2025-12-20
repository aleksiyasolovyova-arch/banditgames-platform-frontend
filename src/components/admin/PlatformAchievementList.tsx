import {useAchievementsList} from "@/hooks/achievement/useAchievements.ts";
import { Loader2, Hash, Target } from "lucide-react";

export const PlatformAchievementList = () => {
    const { data: achievements, isLoading } = useAchievementsList();

    if (isLoading) return <div className="flex items-center gap-2 text-zinc-500"><Loader2 className="animate-spin w-4 h-4"/> Loading achievements...</div>;

    if (!achievements?.length) return <div className="text-zinc-500 italic">No global achievements created yet.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {achievements.map((ach) => (
                <div key={ach.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex gap-4 items-start hover:border-zinc-700 transition-colors">
                    <img
                        src={ach.pictureUrl}
                        alt={ach.name}
                        className="w-12 h-12 rounded bg-zinc-950 object-cover border border-zinc-800"
                        onError={(e) => (e.currentTarget.src = "")}
                    />
                    <div>
                        <h4 className="font-bold text-white text-sm">{ach.name}</h4>
                        <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-900/80 px-1.5 py-0.5 rounded w-fit flex items-center gap-1">
                                <Hash size={10}/> {ach.type}
                            </span>
                            <span className="text-[10px] font-mono text-amber-500 flex items-center gap-1">
                                <Target size={10}/> Require Value: {ach.requiredValue}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}