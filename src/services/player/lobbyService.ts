import axios from 'axios';
import type {
    LobbyDto,
    CreateLobbyForStrangerRequest,
    CreateLobbyForAIRequest,
    CreateLobbyForFriendRequest
} from '@/types/player.types';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const lobbyService = {
    createStrangerLobby:async (request: CreateLobbyForStrangerRequest): Promise<LobbyDto> => {
        const {data} = await axios.post<LobbyDto>(`http://${API_URL}/lobbies/stranger`, request);
        return data;
    },
    createAILobby:async (request: CreateLobbyForAIRequest): Promise<LobbyDto> => {
        const { data } = await axios.post<LobbyDto>(`http://${API_URL}/lobbies/ai`, request);
        return data
    },
    createFriendLobby:async (request: CreateLobbyForFriendRequest): Promise<LobbyDto> => {
        const {data} = await axios.post<LobbyDto>(`http://${API_URL}/lobbies/friend`, request);
        return data;
    }
}