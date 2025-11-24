import {type GameDto, type UpdateGameRequest } from "../types/game.types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/game';

class GameService {
    async getGames(): Promise<GameDto[]> {
        const response = await fetch(`${API_BASE_URL}/games`);
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }
        return response.json();
    }

    async acceptGame(gameId: string): Promise<GameDto> {
        const response = await fetch(`${API_BASE_URL}/games/${gameId}/accept`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to accept game');
        }
        return response.json();
    }

    async rejectGame(gameId: string): Promise<GameDto> {
        const response = await fetch(`${API_BASE_URL}/games/${gameId}/reject`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to reject game');
        }
        return response.json();
    }

    async updateGame(gameId: string, data: UpdateGameRequest): Promise<GameDto> {
        const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update game');
        }
        return response.json();
    }
}

export const gameService = new GameService();