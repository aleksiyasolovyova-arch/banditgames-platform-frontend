export type FriendshipState = 'REQUESTED' | 'FRIENDS' | 'DECLINED' | 'ENDED';

// Backend DTO - exactly matching FriendShipModelDto
export interface FriendShipModelDto {
    friendShipId: string;  // UUID from backend
    befriended: boolean;   // true = FRIENDS, false = REQUESTED
    playerId: string;      // UUID of the OTHER player
    username: string;
    pictureUrl: string;
}

// Frontend union type for easier handling
export type Friend = {
    friendShipId: string;
    playerId: string;
    username: string;
    pictureUrl: string;
    isFriend: true;  // Accepted friendship
};

export type FriendRequest = {
    friendShipId: string;
    playerId: string;
    username: string;
    pictureUrl: string;
    isFriend: false;  // Pending request
};

// Union for component handling
export type Friendship = Friend | FriendRequest;

// For mutations (write model)
export interface FriendshipDto {
    friendShipId: string;
    requesterId: string;
    recipientId: string;
    state: FriendshipState
}

export type FriendTab = 'all' | 'requests' | 'add_friend';

export interface ChangePlayerPictureUrlRequest {
    pictureUrl: string;
}

export interface UnlockedPlatformAchievement {
    achievementId: string;
    unlockedAt: string; //LocalDateTime
}

export interface UnlockedGameAchievement {
    gameId: string;
    code: string;
    unlockedAt: string; //LocalDateTime
}

export interface PlayerDto {
    playerId: string;
    username: string;
    pictureUrl: string;
    joinedDate: string;//change maybe
    unlockedPlatformAchievements: UnlockedPlatformAchievement[];
    unlockedGameAchievements: UnlockedGameAchievement[];
    favoriteGameId?: string;
}

export interface LobbyDto {
    lobbyId: string;
    gameReference: string;
    player1Id: string;
    player2Id: string;
    startTime: string;
    endTime: string | null;
    lobbyResult: string;
    link: string;
}

export interface CreateLobbyForStrangerRequest {
    gameId: string;
    strangerUserName: string;
}

export interface CreateLobbyForAIRequest {
    gameId: string;
}

export interface CreateLobbyForFriendRequest {
    gameId: string;
    friendId: string;
}

export interface Game {
    gameId: string;
    gameUrl: string;
    title?:string;
}

