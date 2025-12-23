export type FriendshipState = 'REQUESTED' | 'FRIENDS' | 'DECLINED' | 'ENDED';

export interface Friend {
    id: string;
    friendshipId: string;
    recipientUsername: string;
    pictureUrl: string;
    state: FriendshipState;
}

export interface RequestFriendshipPayload {
    recipientId: string;
}

export interface FriendshipDto {
    friendshipId: string;
    requesterId: string;
    recipientId: string;
    state: FriendshipState;
}
//assumed to be returned by GET /players/{id}/friend-requests, but tbd
export interface FriendRequest {
    id: string; // Player ID of requester
    friendshipId: string; // Friendship ID for mutations
    recipientUsername: string;
    pictureUrl: string;
    state: 'REQUESTED'; // Always REQUESTED for this view
}

export type FriendTab = 'all' | 'requests' | 'add_friend'