import { useQuery } from '@tanstack/react-query';
import { playerService } from "@/services/player/playerService.ts";

export const usePlayerNavBar = () => {
    return useQuery({
        queryKey: ['player-navbar'],
        queryFn: playerService.getMyNavBarData,
    });
};

export const usePlayerProfile = () => {
    return useQuery({
        queryKey: ['player-profile'],
        queryFn: playerService.getMyProfile,
    });
};