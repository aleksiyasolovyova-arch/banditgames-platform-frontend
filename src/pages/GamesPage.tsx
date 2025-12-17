import { Button } from '@/components/ui/Button';
import TiltedCard from '@/components/ui/TiltedCard.tsx';
import { GameCarousel } from '@/components/gameLibrary/GameCarousel';
import { MOCK_GAMES_USER} from "@/mockData/games.ts";
import type { Game } from '@/types/game.types.ts';

//TODO: add in the logic for the lobby

export function GamesPage() {
    const games = MOCK_GAMES_USER;

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-12">

            <section className="mb-12 pt-6">
                <GameCarousel items={games} />
            </section>

            <div className="mx-auto px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
                            All Games
                        </h2>
                        <p className="text-zinc-400">
                            {games.length} experiences available
                        </p>
                    </div>

                    <div className="w-full md:w-80 relative">
                        <input
                            type="text"
                            placeholder="Search library..."
                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {games.map((game) => (
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
            </div>
        </div>
    );
}

//May move this later to a separate component

function GameCardOverlay({ game }: { game: Game }) {
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