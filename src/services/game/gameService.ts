import axios from 'axios';
import type {Game, UpdateGameUrlRequest, RegisterGameRequest} from "@/types/game.types.ts";
import {MOCK_GAMES_ADMIN, MOCK_GAMES_USER} from "@/mockData/games.ts";

const USE_MOCKS = true;
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const gameService = {

    loadAllGames: async (): Promise<Game[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            const allGames = [...MOCK_GAMES_ADMIN];

            MOCK_GAMES_USER.forEach(userGame => {
                const alreadyExists = allGames.some(g => g.id === userGame.id);
                if (!alreadyExists) {
                    allGames.push(userGame);
                }
            })
            return allGames;
        }
        const { data } = await axios.get(`http://${API_URL}/games`);
        return data;
    },

    loadPublicGames: async (): Promise<Game[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_GAMES_USER;
        }
        const { data } = await axios.get(`http://${API_URL}/games`);
        return data;
    },

    createGame: async (payload: RegisterGameRequest): Promise<Game> => {
        const {data} = await axios.post(`http://${API_URL}/games`, payload);
        return data;
    },

    updateGameUrls: async (id: string, payload: UpdateGameUrlRequest): Promise<Game> => {
        const {data} = await axios.put(`${API_URL}/games/${id}`, payload);
        return data;
    },

    togglePlayableWithAI: async (id: string): Promise<Game> => {
        const { data } = await axios.put(`${API_URL}/games/${id}/toggle`);
        return data;
    },

    passGame: async (id: string): Promise<Game> => {
        const {data} = await axios.put(`${API_URL}/games/${id}/accept`);
        return data;
    },

    failGame: async (id: string): Promise<Game> => {
        const {data} = await axios.put(`${API_URL}/games/${id}/reject`);
        return data;
    }
}