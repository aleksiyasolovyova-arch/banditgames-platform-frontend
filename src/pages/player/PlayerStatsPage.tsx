import {ChangePictureModal} from "@/components/player/ChangePictureModal.tsx";
import {useUserId} from "@/hooks/useKeycloak.tsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import type {PlayerDto} from "@/types/player.types.ts";
import {Button} from "@/components/ui/Button.tsx";

export const PlayerStatsPage = () => {
    const userId = useUserId()
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false)

    const {data: player, isLoading} = useQuery({
        queryKey: ['player', userId],
        queryFn: async () => {
            const response = await axios.get<PlayerDto>(
                `http://${import.meta.env.VITE_BACKEND_URL}/players/${userId}`
            )
            return response.data
        },
    })

    if (isLoading || !player) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex gap-8 mb-12 items-start">
                <div className="flex flex-col items-center">
                    <img
                        src={player.pictureUrl}
                        alt={player.username}
                        className="w-48 h-48 rounded-lg object-cover border-4 border-teal-500 shadow-lg"
                    />
                    <Button
                        onClick={() => setIsPictureModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg text-sm transition"
                    >
                        Change Picture
                    </Button>
                </div>

                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-gray-100 mb-2">
                        {player.username}
                    </h1>
                </div>
            </div>
            <ChangePictureModal
                currentPictureUrl={player.pictureUrl}
                username={player.username}
                isOpen={isPictureModalOpen}
                onClose={() => setIsPictureModalOpen(false)}
            />
        </div>
    )
}
