import axios from 'axios';
import type {
    GamePlayer,
    GameAdmin,
    UpdateGameUrlRequest,
    RegisterGameRequest,
    GameUnauthenticated
} from "@/types/game.types.ts";
import {MOCK_GAMES_ADMIN, MOCK_GAMES_UNAUTHENTICATED, MOCK_GAMES_USER} from "@/mockData/games.ts";

const USE_MOCKS = true;
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const gameService = {

    loadGamesAdmin: async (): Promise<GameAdmin[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
           return MOCK_GAMES_ADMIN;
        }
        const { data } = await axios.get(`http://${API_URL}/games`);
        return data;
    },

    loadGamesPlayer: async (): Promise<GamePlayer[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_GAMES_USER;
        }
        const { data } = await axios.get(`http://${API_URL}/player/games`);
        return data;
    },

    loadGamesUnauthenticated: async (): Promise<GameUnauthenticated[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_GAMES_UNAUTHENTICATED
        }
        const { data } = await axios.get(`http://${API_URL}/games`);
        return data;
    },

    createGame: async (payload: RegisterGameRequest): Promise<GameAdmin> => {
        const {data} = await axios.post(`http://${API_URL}/games`, payload);
        return data;
    },

    updateGameUrls: async (id: string, payload: UpdateGameUrlRequest): Promise<GameAdmin> => {
        const {data} = await axios.put(`${API_URL}/games/${id}`, payload);
        return data;
    },

    togglePlayableWithAI: async (id: string): Promise<GameAdmin> => {
        const { data } = await axios.put(`${API_URL}/games/${id}/toggle`);
        return data;
    },

    passGame: async (id: string): Promise<GameAdmin> => {
        const {data} = await axios.put(`${API_URL}/games/${id}/accept`);
        return data;
    },

    failGame: async (id: string): Promise<GameAdmin> => {
        const {data} = await axios.put(`${API_URL}/games/${id}/reject`);
        return data;
    }
}