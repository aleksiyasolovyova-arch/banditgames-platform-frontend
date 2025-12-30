import { type GameAdmin } from "@/types/game.types.ts";
import { useGameMutations } from "@/hooks/game/useGames.ts";

interface Props {
    game: GameAdmin;
}

export const GameActionButtons = ({ game }: Props) => {
    const { passGame, failGame } = useGameMutations();

    // 1. USE THE BOOLEAN: Check the 'pending' field directly
    if (game.pending) {
        return (
            <div className="flex gap-2 justify-end">
                <button
                    onClick={() => passGame.mutate(game.gameId)}
                    disabled={passGame.isPending}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm"
                >
                    {passGame.isPending ? "..." : "Pass"}
                </button>
                <button
                    onClick={() => failGame.mutate(game.gameId)}
                    disabled={failGame.isPending}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm"
                >
                    {failGame.isPending ? "..." : "Fail"}
                </button>
            </div>
        );
    }

    // 2. IF NOT PENDING: Show a generic "Reviewed" badge
    // (Since your backend isn't sending "PASSED" or "FAILED", we can't show the specific status yet)
    return (
        <span className="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
            Reviewed
        </span>
    );
}