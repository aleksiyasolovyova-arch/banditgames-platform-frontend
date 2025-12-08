import { X, Tag } from 'lucide-react'
import type { Game } from '@/types/game.types'

interface GameInfoOverlayProps {
    game: Game;
    isOpen: boolean;
    onClose: () => void;
}

export const GameInfoOverlay = ({ game, isOpen, onClose }: GameInfoOverlayProps) => {
    return (
        <div
            className={`
                absolute inset-0 z-50 
                bg-zinc-950/95 backdrop-blur-md 
                transition-all duration-300 ease-in-out
                flex flex-col text-left
                ${isOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-4 invisible pointer-events-none'}
            `}
            aria-hidden={!isOpen}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-start p-5 border-b border-white/10 bg-white/5">
                <h4 className="text-white font-bold text-lg tracking-tight leading-none">
                    {game.title}
                </h4>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    className="text-zinc-400 hover:text-white hover:bg-white/10 p-1 rounded-md transition-all"
                    aria-label="Close details"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <div className="space-y-6">

                    <div>
                        <h5 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                            About
                        </h5>
                        <p className="text-zinc-300 text-sm leading-relaxed font-light">
                            {game.description || "No description provided."}
                        </p>
                    </div>

                    {game.tags && game.tags.length > 0 && (
                        <div>
                            <h5 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Tag size={12} /> Tags
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {game.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 text-[10px] uppercase font-semibold bg-white/5 border border-white/10 rounded text-zinc-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}