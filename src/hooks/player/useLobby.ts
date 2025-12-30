import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { lobbyService } from "@/services/player/lobbyService.ts";
import type {
    CreateLobbyForStrangerRequest,
    CreateLobbyForAIRequest,
    CreateLobbyForFriendRequest,
    LobbyDto
} from "@/types/player.types";
import type {GamePlayer} from "@/types/game.types.ts";

export const useLobby = (game?: GamePlayer) => {
    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate();

    // --- Mutations ---

    const strangerMutation = useMutation({
        mutationFn: (req: CreateLobbyForStrangerRequest) => lobbyService.createStrangerLobby(req),
        onSuccess: (data: LobbyDto) => {
            navigate('/lobby-ready', { state: data });
        }
    });

    const aiMutation = useMutation({
        mutationFn: (req: CreateLobbyForAIRequest) => lobbyService.createAILobby(req),
        onSuccess: (data: LobbyDto) => {
            navigate('/lobby-ready', { state: data });
        }
    });

    const friendMutation = useMutation({
        mutationFn: (req: CreateLobbyForFriendRequest) => lobbyService.createFriendLobby(req),
        onSuccess: (data: LobbyDto) => {
            navigate('/lobby-ready', { state: data });
        }
    });

    // --- Handlers ---

    const handleChallengeFriend = (friendId: string, selectedGameId?: string) => {
        const finalGameId = selectedGameId || game?.gameId;
        if (!finalGameId || !friendId) return;

        friendMutation.mutate({
            gameId: finalGameId,
            friendId: friendId
        });
    }

    const handlePlayAI = () => {
        if (!game) return;

        aiMutation.mutate({
            gameId: game.gameId
        });
    }

    const handlePlayStranger = () => {
        if (!game || !username.trim()) return;

        strangerMutation.mutate({
            gameId: game.gameId,
            strangerUserName: username
        });
    }


    return {
        // State
        username,
        setUsername,

        // Computed Loading State (true if any mutation is pending)
        isLoading: strangerMutation.isPending || aiMutation.isPending || friendMutation.isPending,

        // Error State (returns the first error found, if any)
        error: strangerMutation.error || aiMutation.error || friendMutation.error,

        // Actions
        handleChallengeFriend,
        handlePlayAI,
        handlePlayStranger
    }
}