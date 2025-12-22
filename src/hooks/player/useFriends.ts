import { useQuery, useMutation} from "@tanstack/react-query";
import { friendService } from "@/services/player/friendService";

export function useFriendsList() {
    return useQuery({
        queryKey: ['friends', 'list'],
        queryFn: friendService.getFriends,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    })
}

export function useFriendRequests() {
    return useQuery({
        queryKey: ['friends', 'requests'],
        queryFn: friendService.getRequests,
    });
}

export function useSendFriendRequest() {

    return useMutation({
        mutationFn: (username: string) => friendService.sendFriendRequest(username),
    })
}