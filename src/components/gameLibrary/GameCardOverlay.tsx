import { Button } from '@/components/ui/Button';
import type { GamePlayer } from "@/types/game.types.ts";
import { Bot, Sparkles, Star } from "lucide-react";
import { useFavoriteGame } from "@/hooks/game/useFavouriteGame.ts";

interface GameCardOverlayProps {
    game: GamePlayer;
    isFeatured?: boolean;
}

export function GameCardOverlay({ game, isFeatured = false }: GameCardOverlayProps) {
    const { setFavorite } = useFavoriteGame();

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        void setFavorite(game.id);
    };

    return (
        <div className={`flex flex-col justify-between h-full w-full pointer-events-none select-none ${isFeatured ? 'items-center' : ''}`}>

            <div className="p-4 w-full flex justify-between items-start pointer-events-auto z-50">

                <div>
                    {game.playableWithAI && (
                        <div className="group relative">
                            <div className="bg-black/60 backdrop-blur-md border border-emerald-500/50 p-2 rounded-full text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:bg-emerald-500/10 transition-colors cursor-help">
                                <Bot size={20} />
                            </div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                <div className="bg-black/90 border border-zinc-700 text-xs text-zinc-300 px-3 py-2 rounded-lg shadow-xl relative">
                                    <span className="text-emerald-400 font-bold block mb-0.5">Single Player</span>
                                    Play against AI
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-black/90" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleFavoriteClick}
                    className={`
                        p-2 rounded-full backdrop-blur-md border transition-all duration-300 group
                        ${game.isFavourite
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                        : 'bg-black/40 border-zinc-700 text-zinc-500 hover:text-yellow-400 hover:border-yellow-500/50 hover:bg-black/60'
                    }
                    `}
                    title={game.isFavourite ? "Current Favorite" : "Set as Favorite"}
                >
                    <Star
                        size={20}
                        fill={game.isFavourite ? "currentColor" : "none"}
                        className={`transition-transform duration-300 ${game.isFavourite ? 'scale-110' : 'group-hover:scale-110'}`}
                    />
                </button>
            </div>

            <div className={`relative p-5 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-16 ${isFeatured ? 'flex flex-col items-center text-center' : ''}`}>

                <div className={`flex items-center gap-2 mb-3 ${isFeatured ? 'justify-center' : ''}`}>
                    <h3 className={`font-black text-white leading-tight drop-shadow-lg ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
                        {game.name}
                    </h3>
                    {game.isFavourite && (
                        <Sparkles className="text-yellow-500 animate-pulse" size={20} fill="currentColor" />
                    )}
                </div>

                <div className="pointer-events-auto w-full">
                    <Button variant="white" className="w-full font-bold tracking-wide uppercase hover:scale-[1.02] transition-transform active:scale-[0.98]">
                        Play Now
                    </Button>
                </div>
            </div>
        </div>
    );
}