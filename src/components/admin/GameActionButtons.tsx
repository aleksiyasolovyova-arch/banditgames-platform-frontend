import { type GameAdmin, RegistrationState } from "@/types/game.types.ts";
import { useGameMutations } from "@/hooks/game/useGames.ts";

// 1. CLEAN INTERFACE: We only accept 'game' from the parent.
// We removed passGame/failGame because we get them from the hook below.
interface Props {
    game: GameAdmin;
}

export const GameActionButtons = ({ game }: Props) => {
    // 2. GET MUTATIONS: Use the hook directly inside the component
    const { passGame, failGame } = useGameMutations();

    // 3. DEBUGGING: Uncomment this line if buttons still hide.
    // Check the browser console. It should say: "State: PENDING"
    // console.log("State:", game.registrationState, "Expected:", RegistrationState.PENDING);

    // 4. CHECK STATUS: matches your 'as const' definition ("PENDING" === "PENDING")
    const isPending = game.registrationState === RegistrationState.PENDING;

    // 5. IF NOT PENDING: Return the colored Status Badge
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

    // 6. IF PENDING: Return the Pass/Fail Buttons
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