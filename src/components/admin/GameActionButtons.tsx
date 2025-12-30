import {type GameAdmin, RegistrationState} from "@/types/game.types.ts";
import {useGameMutations} from "@/hooks/game/useGames.ts";
import type {UseMutationResult} from "@tanstack/react-query";

interface Props {
    game: GameAdmin
    passGame: UseMutationResult<GameAdmin, Error, string, unknown>;
    failGame: UseMutationResult<GameAdmin, Error, string, unknown>;
}

export const GameActionButtons = ({game}: Props) => {
    const {passGame, failGame} = useGameMutations();
    const isPending = game.registrationState === RegistrationState.PENDING;

    if (!isPending) {
        return (
            <span className={`px-2 py-1 rounded text-sm font-bold 
           ${game.registrationState === RegistrationState.PASSED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
           {game.registrationState}
      </span>
        );
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => passGame.mutate(game.gameId)}
                disabled={passGame.isPending}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >Pass</button>
            <button
                onClick={() => failGame.mutate(game.gameId)}
                disabled={failGame.isPending}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >Fail</button>
        </div>
    )
}