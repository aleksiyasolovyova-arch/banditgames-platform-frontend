import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { achievementService } from "@/services/achievement/achievementService.ts";
import type { CreateAchievementRequest } from "@/types/achievement.type.ts";

export const useAdminAchievements = () => {
    return useQuery({
        queryKey: ['admin-achievements'],
        queryFn: achievementService.getPlatformAchievementsForAdmin,
    });
};

export const usePlayerAchievements = () => {
    return useQuery({
        queryKey: ['my-achievements'],
        queryFn: achievementService.getPlayerAchievements,
    });
};

export const useCreateAchievement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAchievementRequest) => achievementService.createAchievement(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['admin-achievements'] });
        }
    })
}