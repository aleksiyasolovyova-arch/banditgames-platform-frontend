import axios from 'axios';
import type {
    LobbyDto,
    CreateLobbyForStrangerRequest,
    CreateLobbyForAIRequest,
    CreateLobbyForFriendRequest
} from '@/types/player.types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createStrangerLobby = async (request: CreateLobbyForStrangerRequest): Promise<LobbyDto> => {
    const response = await axios.post<LobbyDto>(`http://${API_URL}/lobbies/stranger`, request);
    return response.data;
}

export const createAILobby = async (request: CreateLobbyForAIRequest): Promise<LobbyDto> => {
    const response = await axios.post<LobbyDto>(`http://${API_URL}/lobbies/ai`, request);
    return response.data
}

export const createFriendLobby = async (request: CreateLobbyForFriendRequest): Promise<LobbyDto> => {
    const response = await axios.post<LobbyDto>(`http://${API_URL}/lobbies/friend`, request);
    return response.data;
};