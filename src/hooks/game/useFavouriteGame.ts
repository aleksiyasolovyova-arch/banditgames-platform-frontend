import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gameService } from '@/services/game/gameService';

export function useSetFavoriteGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (gameId: string) => gameService.changeFavoriteGame(gameId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    })
}

export function useRemoveFavoriteGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => gameService.removeFavoriteGame(),
        onSuccess: async () => {
           await queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    })
}

/**
 * Convenience hook that handles both set and remove
 */
export function useFavoriteGame() {
    const setFavoriteMutation = useSetFavoriteGame();
    const removeFavoriteMutation = useRemoveFavoriteGame();

    const toggleFavorite = (gameId: string, currentIsFavourite: boolean) => {
        if (currentIsFavourite) {
            removeFavoriteMutation.mutate();
        } else {
            setFavoriteMutation.mutate(gameId);
        }
    }

    return {
        toggleFavorite,
        isLoading: setFavoriteMutation.isPending || removeFavoriteMutation.isPending,
    }
}
