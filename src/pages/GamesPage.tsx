import { Button } from '@/components/ui/Button';
import TiltedCard from '@/components/ui/TiltedCard.tsx';
import {useState} from "react";
import {useGameListPlayer} from "@/hooks/game/useGames.ts";
import {Loader2, Search} from "lucide-react";
import type {GamePlayer} from "@/types/game.types.ts";

//TODO: add in the logic for the lobby

export function GamesPage() {
    const { data: games, isLoading } = useGameListPlayer();
    const [searchQuery, setSearchQuery] = useState('');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p>Loading arcade library...</p>
            </div>
        )
    }

    const filteredGames  = games?.filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-12 pt-24">
            <div className="mx-auto px-6 max-w-7xl">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-800 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
                            All Games
                        </h2>
                        <p className="text-zinc-400">
                            {filteredGames.length} experiences available
                        </p>
                    </div>

                    <div className="w-full md:w-80 relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search library..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {filteredGames.map((game) => (
                            <div key={game.id} className="flex justify-center w-full">
                                <TiltedCard
                                    imageSrc={game.pictureUrl}
                                    altText={game.name}
                                    captionText={game.name}
                                    containerHeight="420px"
                                    containerWidth="100%"
                                    imageHeight="420px"
                                    imageWidth="100%"
                                    rotateAmplitude={8}
                                    scaleOnHover={1.03}
                                    showMobileWarning={false}
                                    showTooltip={false}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <GameCardOverlay game={game} />
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
                        <p className="text-zinc-500">No games found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

//May move this later to a separate component

function GameCardOverlay({ game }: { game: GamePlayer }) {
    return (
        <div className="flex flex-col justify-between h-full w-full pointer-events-none">
            <div className="p-4 flex justify-between items-start pointer-events-auto">
            </div>

            <div className="relative p-5 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                    {game.name}
                </h3>
                <div className="pointer-events-auto">
                    <Button variant="white" className="w-full">
                        PLAY NOW
                    </Button>
                </div>
            </div>
        </div>
    );
}