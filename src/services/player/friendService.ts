import axios from 'axios';
import {MOCK_FRIENDS, MOCK_REQUESTS} from '@/mockData/friends.ts';
import type {Friend, FriendshipDto} from '@/types/player.types.ts';

const USE_MOCKS = false;
const API_URL = import.meta.env.VITE_BACKEND_URL;

//TODO: for getFriends and getRequests it's part of the read model, so endpoints tbd
export const friendService = {
    getFriends: async (): Promise<Friend[]> => {
        if (USE_MOCKS) {
            return MOCK_FRIENDS;
        }
        const { data } = await axios.get(`http://${API_URL}/friendships`);
        return data;
    },

    getRequests: async (): Promise<Friend[]> => {
        if (USE_MOCKS) {
            return MOCK_REQUESTS
        }
        const { data } = await axios.get(`http://${API_URL}/friendships/requests`);
        return data;
    },

    requestFriendship: async (username: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username.toLowerCase() === 'error') reject(new Error("Player not found"));
                    resolve({ friendshipId: 'mock-fs-id', requesterId: 'me', recipientId: 'them', state: 'REQUESTED' });
                }, 800);
            })
        }
        const { data } = await axios.post(`http://${API_URL}/friendships`, { recipientUsername: username });
        return data;
    },
    acceptFriendship: async (friendshipId: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve) =>
                setTimeout(() =>
                        resolve({
                            friendshipId,
                            requesterId: 'them',
                            recipientId: 'me',
                            state: 'FRIENDS'
                        }),
                    500
                )
            )
        }
        const {data} = await axios.put(`http://${API_URL}/friendships/${friendshipId}/befriend`);
        return data;
    },
    declineFriendship: async (friendshipId: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve) =>
                setTimeout(() =>
                        resolve({
                            friendshipId,
                            requesterId: 'them',
                            recipientId: 'me',
                            state: 'DECLINED'
                        }),
                    500
                )
            )
        }
        const {data} = await axios.put(`http://${API_URL}/friendships/${friendshipId}/decline`);
        return data;
    },
    endFriendship: async (friendshipId: string): Promise<FriendshipDto> => {
        if (USE_MOCKS) {
            return new Promise((resolve) =>
                setTimeout(() =>
                        resolve({
                            friendshipId,
                            requesterId: 'them',
                            recipientId: 'me',
                            state: 'ENDED'
                        }),
                    500
                )
            )
        }
        const {data} = await axios.post(`http://${API_URL}/friendships/${friendshipId}/end`);
        return data;
    }
}