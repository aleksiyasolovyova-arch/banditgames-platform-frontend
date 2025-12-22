import {Button} from "@/components/ui/Button.tsx";
import React from "react";

export function NavButton({
                       isActive,
                       onClick,
                       icon,
                       label,
                       count,
                       variant = 'default'
                   }: {
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    count?: number;
    variant?: 'default' | 'success';
}) {
    const isSuccess = variant === 'success';

    return (
        <Button
            onClick={onClick}
            className={`
                px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-200
                ${isActive
                ? (isSuccess
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-zinc-800 text-white shadow-lg')
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
            }
            `}
        >
            {icon}
            {label}
            {count !== undefined && count > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[1.25rem]">
                    {count}
                </span>
            )}
        </Button>
    );
}