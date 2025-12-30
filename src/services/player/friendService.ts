import axios from 'axios';
import type {Friend, FriendRequest, FriendshipDto, FriendShipModelDto} from '@/types/player.types.ts';

const USE_MOCKS = false;
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const friendService = {
    /**
     * Get all friendships (both FRIENDS and REQUESTED)
     * Backend filters by current user automatically via JWT
     */
    getAllFriendships: async (): Promise<FriendShipModelDto[]> => {
        const { data } = await axios.get<FriendShipModelDto[]>(
            `http://${API_URL}/friendships`
        );
        return data;
    },

    /**
     * Get only accepted friendships
     * Frontend filtering of the above
     */
    getFriends: async (): Promise<Friend[]> => {
        const allFriendships = await friendService.getAllFriendships();
        return allFriendships
            .filter((f) => f.befriended)
            .map((f) => ({
                friendShipId: f.friendShipId,
                playerId: f.playerId,
                username: f.username,
                pictureUrl: f.pictureUrl,
                isFriend: true,
            }));
    },

    /**
     * Get only pending requests (incoming + outgoing)
     * Frontend filtering of the above
     */
    getFriendRequests: async (): Promise<FriendRequest[]> => {
        const allFriendships = await friendService.getAllFriendships();
        return allFriendships
            .filter((f) => !f.befriended)
            .map((f) => ({
                friendShipId: f.friendShipId,
                playerId: f.playerId,
                username: f.username,
                pictureUrl: f.pictureUrl,
                isFriend: false,
            }));
    },

    requestFriendship: async (username: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username.toLowerCase() === 'error') reject(new Error("Player not found"));
                    resolve({ friendShipId: 'mock-fs-id', requesterId: 'me', recipientId: 'them', state: 'REQUESTED' });
                }, 800);
            })
        }
        const { data } = await axios.post(`http://${API_URL}/friendships`, { recipientUsername: username });
        return data;
    },

    acceptFriendship: async (friendShipId: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve) =>
                setTimeout(() =>
                        resolve({
                            friendShipId,
                            requesterId: 'them',
                            recipientId: 'me',
                            state: 'FRIENDS'
                        }),
                    500
                )
            )
        }
        const {data} = await axios.put(`http://${API_URL}/friendships/${friendShipId}/befriend`);
        return data;
    },
    declineFriendship: async (friendShipId: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve) =>
                setTimeout(() =>
                        resolve({
                            friendShipId,
                            requesterId: 'them',
                            recipientId: 'me',
                            state: 'DECLINED'
                        }),
                    500
                )
            )
        }
        const {data} = await axios.put(`http://${API_URL}/friendships/${friendShipId}/decline`);
        return data;
    },
    endFriendship: async (friendShipId: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve) =>
                setTimeout(() =>
                        resolve({
                            friendShipId,
                            requesterId: 'them',
                            recipientId: 'me',
                            state: 'ENDED'
                        }),
                    500
                )
            )
        }
        const {data} = await axios.post(`http://${API_URL}/friendships/${friendShipId}/end`);
        return data;
    }
}