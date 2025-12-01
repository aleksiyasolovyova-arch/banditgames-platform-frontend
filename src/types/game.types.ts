export type GameState = 'ACCEPTED' | 'REJECTED' | 'PENDING'

export interface Game {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

export interface GameDto {
    id: string;
    title: string;
    description: string;
    picture: string;
    creator: string;
    gameUrl: string;
    rules: string[];
}

export interface UpdateGameRequest {
    title: string;
    description: string;
    picture: string;
}

export interface GameCardProps {
    game: GameDto;
    onAccept: (gameId: string) => Promise<void>;
    onReject: (gameId: string) => Promise<void>;
    onEdit: (game: GameDto) => void;
    loading: Record<string, boolean>;
}

export interface UpdateGameModalProps {
    game: GameDto | null;
    onClose: () => void;
    onUpdate: (gameId: string, data: UpdateGameRequest) => Promise<void>;
    loading: boolean;
}