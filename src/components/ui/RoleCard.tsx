import { ArrowRight, LogIn, Lock } from "lucide-react";
import type { RoleCardProps, RoleTheme } from "@/types/user.types";

export const RoleCard = ({ config, onClick }: RoleCardProps) => {
    const { title, description, icon, actionLabel, theme, isRestricted } = config;

    const colorStyles: Record<RoleTheme, string> = {
        indigo: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)] text-indigo-400 bg-indigo-500/10",
        emerald: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] text-emerald-400 bg-emerald-500/10",
        rose: "group-hover:border-rose-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.2)] text-rose-400 bg-rose-500/10",
    };

    const buttonStyles: Record<RoleTheme, string> = {
        indigo: "bg-zinc-800 hover:bg-indigo-600 text-white",
        emerald: "bg-zinc-800 hover:bg-emerald-600 text-white",
        rose: "bg-zinc-800 hover:bg-rose-600 text-white",
    };

    return (
        <button
            onClick={() => onClick(config.id)}
            className={`
                group relative text-left h-full flex flex-col
                bg-zinc-900/50 backdrop-blur-md border border-zinc-800 
                rounded-2xl p-6 transition-all duration-300
                hover:-translate-y-1 hover:bg-zinc-900
                ${colorStyles[theme].split(' ').slice(0, 2).join(' ')}
            `}
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl transition-colors duration-300 ${colorStyles[theme].split(' ').slice(2).join(' ')} group-hover:bg-opacity-20`}>
                    {icon}
                </div>
                {isRestricted && (
                    <div className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800 flex items-center gap-1">
                        <Lock size={10} className="text-rose-500" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Secure</span>
                    </div>
                )}
            </div>

            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {description}
                </p>
            </div>

            <div className={`
                mt-auto flex items-center justify-between py-3 px-4 rounded-lg 
                transition-all duration-300 font-medium text-sm w-full
                ${buttonStyles[theme]}
            `}>
                <span>{actionLabel}</span>
                {isRestricted ? <LogIn size={16} /> : <ArrowRight size={16} />}
            </div>
        </button>
    );
};