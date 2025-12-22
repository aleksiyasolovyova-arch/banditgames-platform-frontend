import { motion } from 'framer-motion';
import { Bot, Users, Swords, X } from 'lucide-react';
import type{ GameMode } from '@/types/matchmaking.types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelectMode: (mode: GameMode) => void;
    gameName: string;
}

export const GameModeModal = ({ isOpen, onClose, onSelectMode, gameName }: Props) => {
    if (!isOpen) return null;

    const modes = [
        {
            id: 'AI' as GameMode,
            title: 'Play against AI',
            desc: 'Instant match against a bot.',
            icon: Bot,
            color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500'
        },
        {
            id: 'FRIEND' as GameMode,
            title: 'Play vs Friend',
            desc: 'Challenge a specific friend.',
            icon: Users,
            color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500'
        },
        {
            id: 'STRANGER' as GameMode,
            title: 'Play vs Stranger',
            desc: 'Find an opponent online.',
            icon: Swords,
            color: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:border-rose-500'
        }
    ]

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-lg w-full shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Play {gameName}</h3>
                        <p className="text-zinc-400 text-sm">Select your game mode</p>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-3">
                    {modes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => onSelectMode(mode.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 group text-left ${mode.color}`}
                        >
                            <div className="p-3 rounded-md bg-black/20">
                                <mode.icon size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-white transition-colors">
                                    {mode.title}
                                </h4>
                                <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                                    {mode.desc}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}