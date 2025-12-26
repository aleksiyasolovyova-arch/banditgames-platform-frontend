// hooks/player/useFriends.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { friendService } from '@/services/player/friendService';
import { useUserId } from '@/hooks/useKeycloak';
import type { Friend, FriendRequest } from '@/types/player.types';
import {useState} from "react";

/**
 * Single source of truth for all friendships
 * Both accepted and pending requests come from here
 */
export function useFriendships() {
    const userId = useUserId();

    return useQuery({
        queryKey: ['friendships', 'all', userId],
        queryFn: () => friendService.getAllFriendships(),
        staleTime: 1000 * 60 * 2, // 2 minutes
        enabled: !!userId,
    });
}

/**
 * Derived: only accepted friendships
 * Uses the main useFriendships query, filters locally
 */
export function useFriendsList() {
    const { data, ...rest } = useFriendships();

    return {
        data: data?.filter((f) => f.befriended) as Friend[] | undefined,
        ...rest,
    };
}

/**
 * Derived: only pending requests
 * Uses the main useFriendships query, filters locally
 */
export function useFriendRequests() {
    const { data, ...rest } = useFriendships();

    return {
        data: data?.filter((f) => !f.befriended) as FriendRequest[] | undefined,
        ...rest,
    };
}

/**
 * Send a friend request (WRITE MODEL)
 */
export function useSendFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (recipientUsername: string) =>
            friendService.requestFriendship(recipientUsername),
        onSuccess: () => {
            // Invalidate the source of truth
            queryClient.invalidateQueries({ queryKey: ['friendships', 'all'] });
        },
    });
}

/**
 * Accept a pending friend request
 */
export function useAcceptFriendship() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendshipId: string) =>
            friendService.acceptFriendship(friendshipId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendships', 'all'] });
        },
    });
}

/**
 * Decline a pending friend request
 */
export function useDeclineFriendship() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendshipId: string) =>
            friendService.declineFriendship(friendshipId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendships', 'all'] });
        },
    });
}

/**
 * End an existing friendship
 */
export function useEndFriendship() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendshipId: string) =>
            friendService.endFriendship(friendshipId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendships', 'all'] });
        },
    });
}

/**
 * Convenience hook for adding friends
 * Handles UI state (loading, success, error)
 */
export function useAddFriend() {
    const [message, setMessage] = useState('');
    const sendMutation = useSendFriendRequest();

    const sendRequest = async (recipientUsername: string): Promise<boolean> => {
        try {
            await sendMutation.mutateAsync(recipientUsername);
            setMessage('Friend request sent successfully!');
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage('An unexpected error occurred');
            }
            return false;
        }
    };

    const resetStatus = () => {
        setMessage('');
    };

    return {
        sendRequest,
        resetStatus,
        isLoading: sendMutation.isPending,
        status: sendMutation.isError ? 'error' : sendMutation.isSuccess ? 'success' : 'idle',
        message,
    };
}
