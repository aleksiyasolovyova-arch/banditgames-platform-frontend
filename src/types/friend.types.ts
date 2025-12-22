export interface Friend {
    id: string;
    username: string;
    pictureUrl: string;
}

export interface FriendRequest {
    id: string;
    username: string;
    pictureUrl: string;
}

export type FriendTab = 'all' | 'requests' | 'add_friend'