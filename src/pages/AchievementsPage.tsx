import { MOCK_ACHIEVEMENTS } from "@/mockData/achievements.ts";
import {AchievementSection} from "@/components/achievements/AchievementSection.tsx";
import {useMemo} from "react";

export function AchievementsPage() {
    const unlockedCount = MOCK_ACHIEVEMENTS.filter(a => a.isUnlocked).length
    const totalCount = MOCK_ACHIEVEMENTS.length
    const progress = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0

    const { gameAchievements, platformAchievements } = useMemo(() => {
        return {
            gameAchievements: MOCK_ACHIEVEMENTS.filter(a => (a as any).category === 'game' || !(a as any).category),
            platformAchievements: MOCK_ACHIEVEMENTS.filter(a => (a as any).category === 'platform'),
        }
    }, [])

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-20 pt-10">
            <header className="mx-auto px-6 py-12 border-b border-zinc-800/50 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Achievements
                        </h1>
                        <p className="text-zinc-400">
                            Track your progress and trophies across games and the platform.
                        </p>
                    </div>

                    <div className="w-full md:w-64">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                            <span className="text-white">Total Completion</span>
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

            <main className="mx-auto px-6 max-w-7xl">
                <AchievementSection
                    title="Platform Milestones"
                    achievements={platformAchievements}
                />

                <AchievementSection
                    title="Game Trophies"
                    achievements={gameAchievements}
                />
            </main>
        </div>
    )
}