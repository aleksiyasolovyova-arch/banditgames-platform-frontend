import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {gameService} from "@/services/game/gameService.ts";
import type{RegisterGameRequest, UpdateGameUrlRequest} from "@/types/game.types.ts";

// Query: Fetch All Games
export const useGamesList = () => {
    return useQuery({
        queryKey: ['games'],
        queryFn: gameService.getAllGames,
    });
};

//Use cases
export const useGameMutations = () => {
    const queryClient = useQueryClient();

    const registerGame = useMutation({
        mutationFn: (data: RegisterGameRequest) => gameService.createGame(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    });

    const updateUrls = useMutation({
        mutationFn: (vars: { id: string; data: UpdateGameUrlRequest }) =>
            gameService.updateGameUrls(vars.id, vars.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    });

    const acceptGame = useMutation({
        mutationFn: gameService.acceptGame,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    });

    const rejectGame = useMutation({
        mutationFn: gameService.rejectGame,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    });

    return { registerGame, updateUrls, acceptGame, rejectGame };
}