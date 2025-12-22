import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {gameService} from "@/services/game/gameService.ts";
import type{RegisterGameRequest, UpdateGameUrlRequest} from "@/types/game.types.ts";

export const useGameListAdmin = () => {
    return useQuery({
        queryKey: ['games'],
        queryFn: gameService.loadGamesAdmin,
    })
}

export const useGameListPlayer = () => {
    return useQuery({
        queryKey: ['games'],
        queryFn: gameService.loadGamesPlayer,
    })
}

export const useGameListUnathenticated = () => {
    return useQuery({
        queryKey: ['games'],
        queryFn: gameService.loadGamesUnauthenticated,
    })
}

//Use cases
export const useGameMutations = () => {
    const queryClient = useQueryClient();

    const registerGame = useMutation({
        mutationFn: (data: RegisterGameRequest) => gameService.createGame(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    })

    const updateUrls = useMutation({
        mutationFn: (vars: { id: string; data: UpdateGameUrlRequest }) =>
            gameService.updateGameUrls(vars.id, vars.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    })

    const toggleAi = useMutation({
        mutationFn: (id: string) => gameService.togglePlayableWithAI(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    })

    const passGame = useMutation({
        mutationFn: gameService.passGame,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    })

    const failGame = useMutation({
        mutationFn: gameService.failGame,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    })

    return { registerGame, updateUrls, toggleAi, passGame, failGame };
}