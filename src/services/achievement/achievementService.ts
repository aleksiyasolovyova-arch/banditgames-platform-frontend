import axios from 'axios';
import type {GameAchievement, PlatformAchievement, CreateAchievementRequest} from "@/types/achievement.type.ts";
import {MOCK_GAME_ACHIEVEMENTS, MOCK_PLATFORM_ACHIEVEMENTS} from "@/mockData/achievements.ts";

const USE_MOCKS = true;
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const achievementService = {
    getPlatformAchievements: async (): Promise<PlatformAchievement[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_PLATFORM_ACHIEVEMENTS;
        }
        const { data } = await axios.get(`http://${API_URL}/achievements`);
        return data;
    },

    getGameAchievements: async (): Promise<GameAchievement[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_GAME_ACHIEVEMENTS;
        }
        const { data } = await axios.get(`http://${API_URL}/achievements`);
        return data;
    },

    createAchievement: async (payload: CreateAchievementRequest): Promise<PlatformAchievement> => {
        const {data} = await axios.post(`http://${API_URL}/achievements`, payload);
        return data;
    }
}
