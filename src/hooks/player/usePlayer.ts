import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type {PlayerDto} from '@/types/player.types';

export function usePlayer() {
    return useQuery({
        queryKey: ['player'],
        queryFn: async () => {
            const { data } = await axios.get<PlayerDto>(
                `http://${import.meta.env.VITE_BACKEND_URL}/players`
            );
            return data;
        },
    });
}