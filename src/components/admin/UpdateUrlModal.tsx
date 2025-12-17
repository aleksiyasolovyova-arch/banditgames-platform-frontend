import {useEffect} from "react";
import { useForm } from "react-hook-form";
import {Modal} from "@/components/ui/Modal";
import { useGameMutations } from "@/hooks/game/useGames.ts";
import type { Game } from "@/types/game.types.ts"
import type { UpdateGameUrlRequest } from "@/types/game.types.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

export const UpdateUrlModal = ({ isOpen, onClose, game }: Props) => {
    const { updateUrls } = useGameMutations();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateGameUrlRequest>({
        defaultValues: {
            pictureUrl: game.pictureUrl,
            gameUrl: game.gameUrl
        }
    })
    useEffect(() => {
        reset({
            pictureUrl: game.pictureUrl,
            gameUrl: game.gameUrl
        })
    }, [game, reset])

    const onSubmit = (data: UpdateGameUrlRequest) => {
        updateUrls.mutate(
            { id: game.id, data },
            { onSuccess: onClose } //closes the pop-up automatically after successful update
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit URLs for ${game.name}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Picture URL</label>
                    <input
                        {...register("pictureUrl", { required: "Picture URL is required" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="https://..."
                    />
                    {errors.pictureUrl && <p className="text-red-500 text-xs mt-1">{errors.pictureUrl.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Game Content URL</label>
                    <input
                        {...register("gameUrl", { required: "Game URL is required" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="https://..."
                    />
                    {errors.gameUrl && <p className="text-red-500 text-xs mt-1">{errors.gameUrl.message}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updateUrls.isPending}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {updateUrls.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}