import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { friendService } from "@/services/player/friendService";
import {useUserId} from "@/hooks/useKeycloak";

export function useFriendsList() {
    const userId = useUserId();

    return useQuery({
        queryKey: ['friends', 'list', userId],
        queryFn: () => friendService.getFriends,
        staleTime: 1000 * 60 * 5,
        enabled: !!userId ,
    });
}

export function useFriendRequests() {
    const userId = useUserId();

    return useQuery({
        queryKey: ['friends', 'requests', userId],
        queryFn: () => friendService.getRequests,
        staleTime: 1000 * 60, // Cache for 1 minute (requests change more frequently)
        enabled: !!userId,
    })
}

export function useSendFriendRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (username: string) =>
            friendService.requestFriendship(username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends', 'requests'] });
        }
    })
}

export function useAcceptFriendship() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendshipId: string) => friendService.acceptFriendship(friendshipId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['friends', 'requests'] });
        },
    });
}

export function useDeclineFriendship() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendshipId: string) => friendService.declineFriendship(friendshipId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends', 'requests'] });
        },
    });
}

export function useEndFriendship() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (friendshipId: string) => friendService.endFriendship(friendshipId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends', 'list'] });
        },
    });
}
