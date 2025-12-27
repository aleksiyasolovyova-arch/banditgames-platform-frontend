import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type {ChangePlayerPictureUrlRequest, PlayerDto} from "@/types/player.types.ts";

export const useChangePlayerPicture = () => {
  const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (pictureUrl: string) => {
            const response = await axios.put<PlayerDto>(
                `http://${import.meta.env.VITE_BACKEND_URL}/players`,
                {pictureUrl} as ChangePlayerPictureUrlRequest
            )
            return response.data
        },
        onSuccess: async (updatedPlayer)  => {
            queryClient.setQueryData(['player'], updatedPlayer)
           await queryClient.invalidateQueries({queryKey: ['player']})

        },
        onError: (error) => {
            console.error('Failed to update picture URL:', error)
        },
    })
}