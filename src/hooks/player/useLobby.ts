import { useState } from 'react';
import axios from 'axios';
import type {
    Game,
    CreateLobbyForStrangerRequest,
    CreateLobbyForAIRequest,
    CreateLobbyForFriendRequest
} from "@/types/player.types";
import {createStrangerLobby, createAILobby, createFriendLobby} from "@/services/player/lobbyService.ts";
import {useNavigate} from "react-router-dom";

export const useLobby = (game?: Game) => {
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleError = (err: unknown) => {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message || 'Failed to create game lobby';
            setError(message);
        } else {
            setError('An unexpected error occurred');
            console.error(err);
        }
    }

    const handleChallengeFriend = async (friendId: string, selectedGameId?: string) => {
        const finalGameId = selectedGameId || game?.gameId;

        if (!finalGameId || !friendId) return;

        setIsLoading(true);
        setError(null);

        try {
            const request: CreateLobbyForFriendRequest = {
                gameId: finalGameId,
                friendId: friendId
            };
            const lobbyData = await createFriendLobby(request);
            navigate('/lobby-ready', { state: lobbyData });
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePlayAI = async () => {
        if (!game) return;
        setIsLoading(true);
        setError(null);

        try {
            const request: CreateLobbyForAIRequest = { gameId: game.gameId };
            const lobbyData = await createAILobby(request);
            navigate('/lobby-ready', { state: lobbyData });
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePlayStranger = async () => {
        if (!game || !username.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const request: CreateLobbyForStrangerRequest = {
                gameId: game.gameId,
                strangerUserName: username
            };
            const lobbyData = await createStrangerLobby(request);
            navigate('/lobby-ready', { state: lobbyData });        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        username,
        setUsername,
        isLoading,
        error,
        handleChallengeFriend,
        handlePlayAI,
        handlePlayStranger
    }
}