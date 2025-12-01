import { MOCK_ACHIEVEMENTS } from "@/mockData/achievements.ts";
import { PixelRevealCard } from "@/components/achievements/PixelRevealCard.tsx";

export function AchievementsPage() {
    const unlockedCount = MOCK_ACHIEVEMENTS.filter(a => a.isUnlocked).length;
    const totalCount = MOCK_ACHIEVEMENTS.length;
    const progress = Math.round((unlockedCount / totalCount) * 100);

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-20 pt-10">
            <header className=" mx-auto px-6 py-12 border-b border-zinc-800/50 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Achievements
                        </h1>
                        <p className="text-zinc-400">
                            Track your progress and trophies.
                        </p>
                    </div>

                    <div className="w-full md:w-64">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                            <span className="text-white">Completion</span>
                            <span className="text-indigo-400">{progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2 text-right">
                            {unlockedCount} / {totalCount} Unlocked
                        </p>
                    </div>
                </div>
            </header>

            <main className=" mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {MOCK_ACHIEVEMENTS.map((achievement) => (
                        <div key={achievement.id} className="flex flex-col gap-3">

                            <PixelRevealCard
                                gridSize={8}
                                pixelColor="#18181b"
                                className="w-full h-full"
                                firstContent={
                                    <div className="w-full h-full relative">
                                        <img
                                            src={achievement.imageUrl}
                                            alt={achievement.title}
                                            className={`w-full h-full object-cover transition-all duration-500 ${!achievement.isUnlocked ? 'grayscale brightness-50 contrast-125' : ''}`}
                                        />
                                        {!achievement.isUnlocked && (
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10">
                                                <span className="text-zinc-400 text-xs">🔒</span>
                                            </div>
                                        )}
                                    </div>
                                }
                                secondContent={
                                    <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-4 text-center">
                                        <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
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

                            <div className="text-center">
                                <h4 className={`text-sm font-bold ${achievement.isUnlocked ? 'text-white' : 'text-zinc-500'}`}>
                                    {achievement.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}