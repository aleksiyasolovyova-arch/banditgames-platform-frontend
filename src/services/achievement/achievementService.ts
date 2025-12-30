import axios from 'axios';
import type {
    PlatformAchievement,
    CreateAchievementRequest,
    PlayerAchievementsDto
} from "@/types/achievement.type.ts";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const achievementService = {
    getPlatformAchievementsForAdmin: async (): Promise<PlatformAchievement[]> => {
        const { data } = await axios.get<PlatformAchievement[]>(`http://${API_URL}/platform-achievements`);
        return data;
    },

    getPlayerAchievements: async (): Promise<PlayerAchievementsDto> => {
        const { data } = await axios.get<PlayerAchievementsDto>(`http://${API_URL}/achievements`);
        return data;
    },

    createAchievement: async (payload: CreateAchievementRequest): Promise<PlatformAchievement> => {
        const { data } = await axios.post<PlatformAchievement>(`http://${API_URL}/platform-achievements`, payload);
        return data;
    }
}