import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
    isSearching: boolean;
    onCancel: () => void;
}

export const MatchmakingOverlay = ({ isSearching, onCancel }: Props) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setSeconds((seconds) => seconds + 1), 1000);
        return () => clearInterval(interval);
    }, [isSearching]);


    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse" />
                <div className="relative bg-zinc-900 border border-indigo-500/30 p-6 rounded-full">
                    <Loader2 size={48} className="text-indigo-500 animate-spin" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Finding Opponent...</h2>
            <p className="text-zinc-400 mb-8 font-mono">
                {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
            </p>

            <button
                onClick={onCancel}
                className="px-6 py-2 rounded-full border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
                Cancel Matchmaking
            </button>
        </div>
    )
}