import {type GameAdmin, RegistrationState} from "@/types/game.types.ts";
import {useGameMutations} from "@/hooks/game/useGames.ts";

interface Props {
    game: GameAdmin;
}

export const GameActionButtons = ({game}: Props) => {
    const {passGame, failGame} = useGameMutations();

    const isPending = game.registrationState === 'PENDING';

    if (!isPending) {
        return (
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
               ${game.registrationState === RegistrationState.PASSED
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'}`
            }>
               {game.registrationState}
            </span>
        );
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => passGame.mutate(game.gameId)}
                disabled={passGame.isPending}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1 shadow-sm"
            >
                {passGame.isPending ? "..." : "Pass"}
            </button>
            <button
                onClick={() => failGame.mutate(game.gameId)}
                disabled={failGame.isPending}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1 shadow-sm"
            >
                {failGame.isPending ? "..." : "Fail"}
            </button>
        </div>
    )
}