import { useQueryClient } from "@tanstack/react-query";
import type { GamePlayer } from "@/types/game.types.ts";

export function useFavoriteGame() {
    const queryClient = useQueryClient();
    const QUERY_KEY = ['games'];

    const setFavorite = async (gameId: string) => {
        await queryClient.cancelQueries({ queryKey: QUERY_KEY });

        const previousGames = queryClient.getQueryData<GamePlayer[]>(QUERY_KEY);

        if (previousGames) {
            queryClient.setQueryData<GamePlayer[]>(QUERY_KEY, (old) => {
                if (!old) return [];
                return old.map(game => ({
                    ...game,
                    isFavourite: game.id === gameId
                }));
            });
        }
        return { previousGames };
    };

    return { setFavorite };
}