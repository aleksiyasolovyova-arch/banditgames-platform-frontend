import {ScrollText, User, X} from 'lucide-react'
import type { Game } from '@/types/game.types'

interface GameInfoOverlayProps {
    game: Game;
    isOpen: boolean;
    onClose: () => void;
}

export const GameCarouselInfoOverlay = ({ game, isOpen, onClose }: GameInfoOverlayProps) => {
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
                    {game.name}
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
                    <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5 w-fit">
                        <User size={14} className="text-indigo-400" />
                        <span className="text-xs text-zinc-400 font-medium">Created by:</span>
                        <span className="text-xs text-white font-bold tracking-wide">
                            {game.gameCreatorName || 'Unknown Studio'}
                        </span>
                    </div>
                    <div>
                        <h5 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                            About
                        </h5>
                        <p className="text-zinc-300 text-sm leading-relaxed font-light">
                            {game.description || "No description provided."}
                        </p>
                    </div>
                    {game.rules && game.rules.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <ScrollText size={14} className="text-indigo-400" />
                                <h5 className="text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                    Game Rules
                                </h5>
                            </div>
                            <ul className="space-y-3">
                                {game.rules.map((rule, index) => (
                                    <li key={index} className="flex gap-3 items-start text-sm text-zinc-300 font-light group">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-indigo-500 transition-colors shrink-0" />
                                        <span className="leading-relaxed">
                                            {rule.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}