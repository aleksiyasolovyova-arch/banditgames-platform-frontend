import type { Friend, FriendRequest } from '@/types/friend.types.ts';

export const MOCK_FRIENDS: Friend[] = [
    {
        id: 'adffcedb-90e8-4e33-bb37-381dd82dda17',
        friendshipId: '8f41f430-e8e6-41e9-8768-e4ec0a9be6b9',
        username: 'Neon_Ninja',
        pictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&h=800&fit=crop',
        state: "FRIENDS"
    },
    {
        id: 'e91869bc-050d-4b30-bd69-d4d47e56eeab',
        friendshipId: '13cf7364-a2f7-4b26-b824-7d6b5510a881',
        username: 'Sarah_Connor',
        pictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
        state: "FRIENDS"
    },
    {
        id: '0ae41a9b-86cf-4648-8fb2-ead024a42faa',
        friendshipId: 'bef06ead-6a4f-42f4-a30e-b45f535091b0',
        username: 'Pixel_Drifter',
        pictureUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&h=800&fit=crop',
        state: "FRIENDS"
    },
    {
        id: 'bbdb1920-153e-42b6-8e8c-049d044cbd68',
        friendshipId: 'e18e241f-ad7c-48d4-a236-56fbe885dc9d',
        username: 'Cyber_Punk',
        pictureUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&h=800&fit=crop',
        state: "FRIENDS"
    },
];

export const MOCK_REQUESTS: FriendRequest[] = [
    {
        id: '9137bce0-e60e-490d-a337-1008294878f6',
        friendshipId: 'fs-mock-001',
        username: 'NeonStriker',
        pictureUrl: 'https://i.pravatar.cc/150?u=101',
        state: 'REQUESTED'
    },
    {
        id: '8f41f430-e8e6-41e9-8768-e4ec0a9be6b9',
        friendshipId: 'fs-mock-002',
        username: 'CyberLion',
        pictureUrl: 'https://i.pravatar.cc/150?u=102',
        state: 'REQUESTED'
    },
];
