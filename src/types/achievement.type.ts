export interface Achievement {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    isUnlocked: boolean;
    dateUnlocked?: string;
}