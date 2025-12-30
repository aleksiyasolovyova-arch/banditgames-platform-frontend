export type FriendshipState = 'REQUESTED' | 'FRIENDS' | 'DECLINED' | 'ENDED';

export interface FriendShipModelDto {
    friendShipId: string;
    befriended: boolean;   // true = FRIENDS, false = REQUESTED
    playerId: string;      // UUID of the OTHER player
    username: string;
    pictureUrl: string;
}

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

export const GetPlayerScope = {
    NAVBAR: 'NAVBAR',
    PROFILE: 'PROFILE'
} as const;

export type GetPlayerScope = (typeof GetPlayerScope)[keyof typeof GetPlayerScope];

export interface PlayerNavBarDto {
    playerID: string;
    username: string;
    pictureUrl: string;
}

export interface PlayerHistoryDto {
    lobbyId: string;
    gameId: string;
    gameName: string;
    pictureUrl: string;
    opponentId: string;
    opponentUsername: string;
    opponentPictureUrl: string;
    result: 'WIN' | 'LOSS' | 'DRAW' | 'UNKNOWN';
    durationMinutes: number;
    startedAt: string;
    finishedAt: string;
}

export interface PlayerProfileDto {
    playerId: string;
    username: string;
    pictureUrl: string;

    joinedDate: string;
    lastActive: string;

    favouriteGameId?: string | null;
    favouriteGameName?: string | null;
    favouriteGamePictureUrl?: string | null;

    totalGamesPlayed: number;
    totalWins: number;
    totalLosses: number;
    totalDraws: number;
    winRatePercentage: number;

    totalPlaytimeMinutes: number;
    totalHoursPlayed: number;

    longestWinningStreak: number;
    currentWinningStreak: number;

    firstMoveGames: number;
    firstMoveWins: number;
    firstMoveWinRatePercentage: number;
    secondMoveGames: number;
    secondMoveWins: number;
    secondMoveWinRatePercentage: number;

    // Match History List
    games: PlayerHistoryDto[];
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

