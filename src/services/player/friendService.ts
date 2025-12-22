import axios from 'axios';
import { MOCK_FRIENDS, MOCK_REQUESTS } from '@/mockData/friends.ts';
import type {Friend, FriendRequest} from '@/types/friend.types.ts';

const USE_MOCKS = true;
const API_URL = import.meta.env.VITE_BACKEND_URL;

//TODO: All these endpoints are tbd so CHANGE THEM when you learn
export const friendService = {
    getFriends: async (): Promise<Friend[]> => {
        if (USE_MOCKS) {
            return MOCK_FRIENDS;
        }
        const { data } = await axios.get(`http://${API_URL}/friends`);
        return data;
    },
    getRequests: async (): Promise<FriendRequest[]> => {
        if (USE_MOCKS) {
            return MOCK_REQUESTS;
        }
        const { data } = await axios.get(`http://${API_URL}/friends/requests`);
        return data;
    },
    sendFriendRequest: async (username: string): Promise<string> => {
        if (USE_MOCKS) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate 404 for specific username
                    if (username.toLowerCase() === 'error') {
                        reject(new Error('This player could not be found.'));
                    } else {
                        resolve(`Friend request sent to ${username}!`);
                    }
                }, 800);
            })
        }
        const { data } = await axios.post(`http://${API_URL}/friends/requests`, { username });
        return data;
    },
    respondToFriendRequest: async (username: string, accept: boolean): Promise<string> => {
        if (USE_MOCKS) {
            return new Promise((resolve) => setTimeout(resolve, 500));
        }
        const { data } = await axios.put(`http://${API_URL}/friends/requests/${username}`, { accept });
        return data;
    }
}