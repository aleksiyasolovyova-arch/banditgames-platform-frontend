export type GameMode = 'AI' | 'FRIEND' | 'STRANGER'

export interface MatchmakingState {
    status: 'IDLE' | 'SEARCHING' | 'MATCH_FOUND' | 'ERROR';
    startTime?: number;
}