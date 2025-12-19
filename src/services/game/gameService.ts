import axios from 'axios';
import type {Game, UpdateGameUrlRequest, RegisterGameRequest} from "@/types/game.types.ts";
import {MOCK_GAMES_ADMIN} from "@/mockData/games.ts";

const USE_MOCKS = true;
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const gameService = {
    getAllGames: async (): Promise<Game[]> => {
        if (USE_MOCKS) {
            await new Promise(r => setTimeout(r, 500));
            return MOCK_GAMES_ADMIN;
        }
        const { data } = await axios.get(`${API_URL}/games`);
        return data;
    },

    createGame: async (payload: RegisterGameRequest): Promise<Game> => {
        const {data} = await axios.post(`${API_URL}/games`, payload);
        return data;
    },

    updateGameUrls: async (id: string, payload: UpdateGameUrlRequest): Promise<Game> => {
        const {data} = await axios.put(`${API_URL}/games/${id}`, payload);
        return data;
    },

    acceptGame: async (id: string): Promise<Game> => {
        const {data} = await axios.put(`${API_URL}/games/${id}/accept`);
        return data;
    },

    rejectGame: async (id: string): Promise<Game> => {
        const {data} = await axios.put(`${API_URL}/games/${id}/reject`);
        return data;
    }
};