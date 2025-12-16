import {type Game, RegistrationState} from "@/types/game.types.ts";
import {useGameMutations} from "@/hooks/game/useGames.ts";

interface Props {
    game: Game
}

export const GameActionButtons = ({game}: Props) => {
    const {acceptGame, rejectGame} = useGameMutations();
    const isPending = game.registrationState === RegistrationState.PENDING;

    if (!isPending) {
        return (
            <span className={`px-2 py-1 rounded text-sm font-bold 
           ${game.registrationState === RegistrationState.ACCEPTED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
           {game.registrationState}
      </span>
        );
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => acceptGame.mutate(game.id)}
                disabled={acceptGame.isPending}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >Accept</button>
            <button
                onClick={() => rejectGame.mutate(game.id)}
                disabled={rejectGame.isPending}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >Reject</button>
        </div>
    )
}