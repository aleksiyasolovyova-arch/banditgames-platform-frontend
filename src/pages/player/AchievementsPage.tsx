import { usePlayerAchievements } from "@/hooks/achievement/useAchievements.ts";
import { AchievementSection, type UIPlatformAchievement, type UIGameAchievement } from "@/components/achievements/AchievementSection.tsx";
import { Loader2 } from "lucide-react";

export function AchievementsPage() {
    const { data, isLoading } = usePlayerAchievements();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p>Loading your trophies...</p>
            </div>
        )
    }

    const platformList = data?.platformAchievements || [];
    const gameList = data?.gameAchievements || [];

    const platformAchievementsWithStatus: UIPlatformAchievement[] = platformList.map(ach => {
        const isUnlocked = !!ach.unlockedAt;

        return {
            ...ach,
            isUnlocked,
            currentValue: isUnlocked ? ach.requiredValue : 0,
            unlockedDate: ach.unlockedAt ? new Date(ach.unlockedAt).toLocaleDateString() : null
        }
    })

    const gameAchievementsWithStatus: UIGameAchievement[] = gameList.map(ach => ({
        ...ach,
        isUnlocked: !!ach.unlockedAt,
    }))

    const platformUnlocked = platformAchievementsWithStatus.filter(a => a.isUnlocked).length;
    const gameUnlocked = gameAchievementsWithStatus.filter(a => a.isUnlocked).length;

    const totalUnlocked = platformUnlocked + gameUnlocked;
    const totalCount = platformList.length + gameList.length;
    const progress = totalCount > 0 ? Math.round((totalUnlocked / totalCount) * 100) : 0;

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
                            {totalUnlocked} / {totalCount} Unlocked
                        </p>
                    </div>
                </div>
            </header>

            <main className="mx-auto px-6 max-w-7xl">
                <AchievementSection
                    title="Platform Milestones"
                    achievements={platformAchievementsWithStatus}
                />

                <AchievementSection
                    title="Game Trophies"
                    achievements={gameAchievementsWithStatus}
                />
            </main>
        </div>
    )
}