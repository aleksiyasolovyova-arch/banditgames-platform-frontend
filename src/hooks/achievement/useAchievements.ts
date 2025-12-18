import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { achievementService} from "@/services/achievement/achievementService.ts";
import type{ CreateAchievementRequest} from "@/types/achievement.type.ts";
// Add these hooks for the admin page
export const useAchievementsList = () => {
    return useQuery({
        queryKey: ['achievements'],
        queryFn: achievementService.getAll,
    });
};

export const useCreateAchievement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAchievementRequest) => achievementService.createAchievement(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['achievements'] });
        }
    });
};