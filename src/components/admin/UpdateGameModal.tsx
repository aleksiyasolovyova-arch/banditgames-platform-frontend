import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Bot, Loader2 } from "lucide-react"; // Optional icons
import { Modal } from "@/components/ui/Modal";
import { useGameMutations } from "@/hooks/game/useGames.ts";
import type { GameAdmin } from "@/types/game.types.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    game: GameAdmin;
}

interface FormValues {
    pictureUrl: string;
    gameUrl: string;
    playableWithAI: boolean;
}

export const UpdateGameModal = ({ isOpen, onClose, game }: Props) => {
    const { updateUrls, toggleAi } = useGameMutations();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        defaultValues: {
            pictureUrl: game.pictureUrl,
            gameUrl: game.gameUrl,
            playableWithAI: game.playableWithAI || false
        }
    });

    useEffect(() => {
        if (isOpen && game) {
            reset({
                pictureUrl: game.pictureUrl,
                gameUrl: game.gameUrl,
                playableWithAI: game.playableWithAI || false
            });
        }
    }, [game, isOpen, reset]);

    const onSubmit = async (data: FormValues) => {
        const promises = [];

        if (data.pictureUrl !== game.pictureUrl || data.gameUrl !== game.gameUrl) {
            promises.push(
                updateUrls.mutateAsync({
                    id: game.gameId,
                    data: { pictureUrl: data.pictureUrl, gameUrl: data.gameUrl }
                })
            );
        }

        if (data.playableWithAI !== game.playableWithAI) {
            promises.push(toggleAi.mutateAsync(game.gameId));
        }

        try {
            await Promise.all(promises);
            onClose();
        } catch (error) {
            console.error("Failed to update game", error);
        }
    }

    const isLoading = isSubmitting || updateUrls.isPending || toggleAi.isPending;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Settings for ${game.name}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Picture URL</label>
                        <input
                            {...register("pictureUrl", { required: "Picture URL is required" })}
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="https://..."
                        />
                        {errors.pictureUrl && <p className="text-red-500 text-xs mt-1">{errors.pictureUrl.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Game Content URL</label>
                        <input
                            {...register("gameUrl", { required: "Game URL is required" })}
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="https://..."
                        />
                        {errors.gameUrl && <p className="text-red-500 text-xs mt-1">{errors.gameUrl.message}</p>}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded shadow-sm text-indigo-600">
                            <Bot size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">AI Compatibility</p>
                            <p className="text-xs text-gray-500">Enable AI Agent access</p>
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register("playableWithAI")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};