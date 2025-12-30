import { PixelRevealCard } from "@/components/achievements/PixelRevealCard.tsx";
import { Gamepad2, Lock } from "lucide-react";
import type { PlatformAchievement, GameAchievement } from "@/types/achievement.type.ts";

export interface UIPlatformAchievement extends PlatformAchievement {
    isUnlocked: boolean;
    currentValue: number; // Calculated in parent (0 if locked, requiredValue if unlocked)
}

export interface UIGameAchievement extends GameAchievement {
    isUnlocked: boolean;
}

type AchievementItem = UIPlatformAchievement | UIGameAchievement;

interface AchievementSectionProps {
    title: string;
    achievements: AchievementItem[];
}

export const AchievementSection = ({ title, achievements }: AchievementSectionProps) => {
    if (!achievements || achievements.length === 0) return null;

    const isPlatformAchievement = (
        achievement: AchievementItem
    ): achievement is UIPlatformAchievement => {
        return 'requiredValue' in achievement;
    };

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-indigo-500">
                {title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {achievements.map((achievement) => {
                    const isPlatform = isPlatformAchievement(achievement);

                    const uniqueKey = isPlatform
                        ? achievement.achievementId
                        : `${achievement.gameId}-${achievement.code}`;

                    const displayTitle = isPlatform
                        ? achievement.name
                        : achievement.code.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');

                    const displayImage = achievement.pictureUrl;
                    const isUnlocked = achievement.isUnlocked;

                    return (
                        <div key={uniqueKey} className="flex flex-col gap-3 group">
                            <PixelRevealCard
                                gridSize={8}
                                pixelColor="#18181b"
                                className="w-full aspect-square"
                                firstContent={
                                    <div className={`w-full h-full relative overflow-hidden rounded-md bg-zinc-900 border border-white/5 flex items-center justify-center
                                        ${!isUnlocked ? 'grayscale brightness-[0.25] contrast-125' : 'grayscale-0 brightness-100'}
                                    `}>
                                        {displayImage ? (
                                            <img
                                                src={displayImage}
                                                alt={displayTitle}
                                                className="w-full h-full object-cover transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-2 text-zinc-700">
                                                <Gamepad2 size={48} strokeWidth={1} />
                                                <span className="text-[10px] font-mono uppercase opacity-50">
                                                    {isPlatform ? 'System' : 'Game Reward'}
                                                </span>
                                            </div>
                                        )}

                                        {!isUnlocked && (
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10">
                                                <Lock size={12} className="text-zinc-400" />
                                            </div>
                                        )}
                                    </div>
                                }
                                secondContent={
                                    <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-4 text-center border border-white/5 rounded-md relative">

                                        <div className={`absolute top-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            isUnlocked ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500'
                                        }`}>
                                            {isUnlocked ? 'Unlocked' : 'Locked'}
                                        </div>

                                        <p className="text-zinc-300 text-xs leading-relaxed mt-4">
                                            {achievement.description}
                                        </p>

                                        {isPlatform && !isUnlocked && (
                                            <div className="w-full mt-auto pt-2">
                                                <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                                                    <span>Progress</span>
                                                    <span>{achievement.currentValue} / {achievement.requiredValue}</span>
                                                </div>
                                                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-500 transition-all duration-500"
                                                        style={{ width: `${Math.min(100, (achievement.currentValue / achievement.requiredValue) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {!isPlatform && (
                                            <div className="mt-auto pt-3 border-t border-white/5 w-full">
                                                <p className="text-[10px] text-zinc-500 truncate">
                                                    {(achievement as UIGameAchievement).gameName}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                }
                            />

                            <div className="text-center px-1">
                                <h4 className={`text-sm font-bold truncate transition-colors duration-300 ${
                                    isUnlocked ? 'text-white' : 'text-zinc-600'
                                }`}>
                                    {displayTitle}
                                </h4>
                                {isPlatform && (
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                                        Platform
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};