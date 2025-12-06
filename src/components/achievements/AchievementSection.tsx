import type {MOCK_ACHIEVEMENTS} from "@/mockData/achievements.ts";
import {PixelRevealCard} from "@/components/achievements/PixelRevealCard.tsx";

interface AchievementSectionProps {
    title: string
    achievements: typeof MOCK_ACHIEVEMENTS
}

export const AchievementSection = ({ title, achievements }: AchievementSectionProps) => {
    if (achievements.length === 0) return null

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-indigo-500">
                {title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex flex-col gap-3 group">
                        <PixelRevealCard
                            gridSize={8}
                            pixelColor="#18181b"
                            className="w-full aspect-square"
                            firstContent={
                                <div className="w-full h-full relative overflow-hidden rounded-md">
                                    <img
                                        src={achievement.imageUrl}
                                        alt={achievement.title}
                                        className={`w-full h-full object-cover transition-all duration-500 
                                            ${!achievement.isUnlocked
                                            ? 'grayscale brightness-[0.25] contrast-125'
                                            : 'grayscale-0 brightness-100'
                                        }
                                        `}
                                    />
                                    {!achievement.isUnlocked && (
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10">
                                            <span className="text-zinc-400 text-xs" aria-label="Locked">🔒</span>
                                        </div>
                                    )}
                                </div>
                            }
                            secondContent={
                                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-4 text-center border border-white/5 rounded-md">
                                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                                        achievement.isUnlocked ? 'text-indigo-400' : 'text-zinc-600'
                                    }`}>
                                        {achievement.isUnlocked ? 'Unlocked' : 'Locked'}
                                    </p>
                                    <p className="text-zinc-300 text-sm leading-snug">
                                        {achievement.description}
                                    </p>
                                    {achievement.dateUnlocked && (
                                        <p className="text-[10px] text-zinc-500 mt-3 border-t border-white/10 pt-2 w-full">
                                            {achievement.dateUnlocked}
                                        </p>
                                    )}
                                </div>
                            }
                        />

                        <div className="text-center px-1">
                            <h4 className={`text-sm font-bold truncate transition-colors duration-300 ${
                                achievement.isUnlocked ? 'text-white' : 'text-zinc-600'
                            }`}>
                                {achievement.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}