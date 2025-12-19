import axios from 'axios';
import type {Achievement, CreateAchievementRequest} from "@/types/achievement.type.ts";
import {MOCK_PLATFORM_ACHIEVEMENTS} from "@/mockData/achievements.ts";

const USE_MOCKS = true;
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const achievementService = {
    getAll: async (): Promise<Achievement[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_PLATFORM_ACHIEVEMENTS;
        }
        const { data } = await axios.get(`${API_URL}/achievements`);
        return data;
    },
    createAchievement: async (payload: CreateAchievementRequest): Promise<Achievement> => {
        const {data} = await axios.post(`${API_URL}/achievements`, payload);
        return data;
    }
}