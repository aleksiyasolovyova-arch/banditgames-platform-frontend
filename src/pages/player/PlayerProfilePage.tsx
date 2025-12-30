import { usePlayerProfile } from "@/hooks/player/usePlayer.ts";
import {Loader2, Calendar, Clock, Trophy, Flame, History, Target, TrendingUp, Camera} from "lucide-react";
import type { PlayerHistoryDto } from "@/types/player.types.ts";
import {ChangePictureModal} from "@/components/player/ChangePictureModal.tsx";
import {type ReactNode, useState} from "react";

export function PlayerProfilePage() {
    const { data: profile, isLoading, error } = usePlayerProfile();
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-400">
                Failed to load profile data.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <div className="relative group cursor-pointer" onClick={() => setIsPictureModalOpen(true)}>
                    <img
                        src={profile.pictureUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"}
                        alt={profile.username}
                        className="w-32 h-32 rounded-full border-4 border-zinc-800 bg-zinc-900 object-cover transition-transform group-hover:scale-105"
                    />
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Camera className="text-white w-8 h-8" />
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black text-white mb-2">{profile.username}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-zinc-400">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} /> Joined {new Date(profile.joinedDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} /> Last Active {new Date(profile.lastActive).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {profile.favouriteGameId && (
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center gap-4 min-w-[200px]">
                            <img src={profile.favouriteGamePictureUrl || undefined} alt="Fav" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Favorite</div>
                                <div className="font-bold">{profile.favouriteGameName}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Win Rate"
                        value={`${profile.winRatePercentage.toFixed(1)}%`}
                        icon={<Target className="text-emerald-500" />}
                        subtext={`${profile.totalWins}W - ${profile.totalLosses}L - ${profile.totalDraws}D`}
                    />
                    <StatCard
                        label="Total Playtime"
                        value={`${profile.totalHoursPlayed.toFixed(1)}h`}
                        icon={<Clock className="text-indigo-500" />}
                        subtext={`${profile.totalGamesPlayed} Matches`}
                    />
                    <StatCard
                        label="Current Streak"
                        value={profile.currentWinningStreak.toString()}
                        icon={<Flame className="text-orange-500" />}
                        subtext={`Best: ${profile.longestWinningStreak}`}
                    />
                    <StatCard
                        label="Total Wins"
                        value={profile.totalWins.toString()}
                        icon={<Trophy className="text-yellow-500" />}
                        subtext="Across all games"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MoveStatCard
                        title="First Move Advantage"
                        winRate={profile.firstMoveWinRatePercentage}
                        games={profile.firstMoveGames}
                        wins={profile.firstMoveWins}
                        color="indigo"
                    />
                    <MoveStatCard
                        title="Second Move Defense"
                        winRate={profile.secondMoveWinRatePercentage}
                        games={profile.secondMoveGames}
                        wins={profile.secondMoveWins}
                        color="purple"
                    />
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
                        <History className="text-zinc-400" />
                        <h2 className="font-bold text-lg text-white">Recent Match History</h2>
                    </div>
                    <div className="divide-y divide-zinc-800/50">
                        {profile.games.length === 0 ? (
                            <div className="p-8 text-center text-zinc-500 italic">No matches played yet.</div>
                        ) : (
                            profile.games.map((game) => (
                                <HistoryItem key={game.gameId + game.startedAt} game={game} />
                            ))
                        )}
                    </div>
                </div>
                <ChangePictureModal
                    isOpen={isPictureModalOpen}
                    onClose={() => setIsPictureModalOpen(false)}
                    currentPictureUrl={profile.pictureUrl}
                    username={profile.username}
                />
            </div>
        </div>
    )
}

// --- SUB COMPONENTS ---

function StatCard({ label, value, icon, subtext }: { label: string, value: string, icon: ReactNode, subtext: string }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <span className="text-zinc-400 text-sm font-medium">{label}</span>
                {icon}
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs text-zinc-500 font-mono">{subtext}</div>
        </div>
    );
}

function MoveStatCard({ title, winRate, games, wins, color }: { title: string, winRate: number, games: number, wins: number, color: 'indigo'|'purple' }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="font-bold text-zinc-300 mb-4 flex items-center gap-2">
                <TrendingUp size={16} /> {title}
            </h3>
            <div className="flex items-end gap-4 mb-4">
                <div className="text-4xl font-black text-white">{winRate.toFixed(1)}%</div>
                <div className="text-sm text-zinc-500 mb-1">Win Rate</div>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                <div className={`h-full ${color === 'indigo' ? 'bg-indigo-500' : 'bg-purple-500'}`} style={{ width: `${winRate}%` }} />
            </div>
            <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                <span>Games: {games}</span>
                <span>Wins: {wins}</span>
            </div>
        </div>
    )
}

function HistoryItem({ game }: { game: PlayerHistoryDto }) {
    const isWin = game.result === 'WIN';
    const isLoss = game.result === 'LOSS';

    const resultColor = isWin ? 'text-emerald-400' : isLoss ? 'text-red-400' : 'text-amber-400';
    const borderClass = isWin ? 'border-l-emerald-500' : isLoss ? 'border-l-red-500' : 'border-l-amber-500';

    return (
        <div className={`p-4 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors border-l-4 ${borderClass}`}>
            <img src={game.pictureUrl} alt={game.gameName} className="w-12 h-12 rounded-lg object-cover bg-zinc-950" />

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-zinc-200 truncate">{game.gameName}</h4>
                <div className="text-xs text-zinc-500 flex items-center gap-2">
                    <Calendar size={10} /> {new Date(game.finishedAt).toLocaleDateString()}
                    <span>•</span>
                    <Clock size={10} /> {game.durationMinutes}m
                </div>
            </div>

            <div className="hidden md:flex items-center gap-3 px-4">
                <span className="text-xs text-zinc-500 font-bold">VS</span>
                <div className="flex items-center gap-2">
                    <img src={game.opponentPictureUrl} className="w-6 h-6 rounded-full bg-zinc-800"  alt={''}/>
                    <span className="text-sm text-zinc-300">{game.opponentUsername}</span>
                </div>
            </div>

            <div className={`font-black text-sm uppercase tracking-wider ${resultColor}`}>
                {game.result}
            </div>
        </div>
    );
}