import axios from 'axios';
import {GetPlayerScope, type PlayerNavBarDto, type PlayerProfileDto} from "@/types/player.types.ts";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const playerService = {
    getMyProfile: async (): Promise<PlayerProfileDto> => {
        const { data } = await axios.get<PlayerProfileDto>(`http://${API_URL}/players`, {
            params: { scope: GetPlayerScope.PROFILE }
        });
        return data;
    },

    getMyNavBarData: async (): Promise<PlayerNavBarDto> => {
        const { data } = await axios.get<PlayerNavBarDto>(`http://${API_URL}/players`, {
            params: { scope: GetPlayerScope.NAVBAR }
        });
        return data;
    }
};