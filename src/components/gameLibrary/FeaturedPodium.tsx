import TiltedCard from '@/components/ui/TiltedCard.tsx';
import { GameCardOverlay } from "@/components/gameLibrary/GameCardOverlay.tsx";
import { Crown } from "lucide-react";
import type { GamePlayer } from "@/types/game.types.ts";

export function FeaturedPodium({ game }: { game: GamePlayer }) {
    return (
        <div className="relative w-full flex flex-col items-center justify-center pt-4 pb-12">


            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-gradient-to-t from-yellow-500/10 via-yellow-500/5 to-transparent blur-3xl pointer-events-none z-0" />

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[40px] bg-yellow-500/20 blur-xl rounded-[100%]" />
                <div className="w-[500px] h-[100px] bg-gradient-to-t from-transparent via-yellow-900/10 to-transparent border-t border-yellow-500/10 rounded-[100%] transform scale-y-50" />
            </div>


            <div className="relative z-20 flex items-center gap-3 px-5 py-1.5 mb-8 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] backdrop-blur-md animate-in slide-in-from-top-4 duration-700">
                <Crown size={14} fill="currentColor" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Your Favourite Game</span>
                <Crown size={14} fill="currentColor" />
            </div>

            <div className="relative z-10 group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] z-50 animate-bounce-slow">
                    <Crown size={40} fill="currentColor" strokeWidth={1.5} />
                </div>

                <div className="relative rounded-2xl p-1 bg-gradient-to-b from-yellow-400 via-yellow-600/20 to-transparent shadow-[0_0_60px_-15px_rgba(234,179,8,0.4)]">
                    <TiltedCard
                        imageSrc={game.pictureUrl}
                        altText={game.name}
                        captionText={game.name}
                        containerHeight="480px"
                        containerWidth="340px"
                        imageHeight="480px"
                        imageWidth="340px"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={<GameCardOverlay game={game} isFeatured={true} />}
                    />
                </div>
            </div>
        </div>
    );
}