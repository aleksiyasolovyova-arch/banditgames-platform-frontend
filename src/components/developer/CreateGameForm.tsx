import {useForm, useFieldArray} from "react-hook-form";
import {useAchievementsList} from "@/hooks/achievement/useAchievements.ts";
import {useGameMutations} from "@/hooks/game/useGames.ts";
import type{RegisterGameRequest} from "@/types/game.types.ts";

export const CreateGameForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const { registerGame } = useGameMutations();
    const { data: availableAchievements } = useAchievementsList();

    const { register, control, handleSubmit, formState: { errors } } = useForm<RegisterGameRequest>({
        defaultValues: {
            rules: [{description: ''}], //starts with one empty rule
            achievements: []
        }
    })

    const { fields: ruleFields, append: addRule, remove: removeRule } = useFieldArray({
        control,
        name: "rules"
    })

    const { fields: achFields, append: addAch, remove: removeAch } = useFieldArray({
        control,
        name: "achievements"
    })

    const onSubmit = (data: RegisterGameRequest) => {
        registerGame.mutate(data, {
            onSuccess: () => onSuccess()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input {...register("name", { required: true })} className="border w-full p-2 rounded" />
                    {errors.name && <span className="text-red-500 text-sm">Required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input type="number" {...register("price", { required: true, min: 0 })} className="border w-full p-2 rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea {...register("description")} className="border w-full p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Creator Name</label>
                    <input {...register("gameCreatorName", { required: true })} className="border w-full p-2 rounded" />
                </div>
            </div>

            {/*urls*/}
            <div className="grid grid-cols-2 gap-4">
                <input {...register("pictureUrl")} placeholder="Picture URL" className="border p-2 rounded" />
                <input {...register("gameUrl")} placeholder="Game Content URL" className="border p-2 rounded" />
            </div>

            {/*rules*/}
            <div>
                <label className="block text-sm font-medium mb-2">Game Rules</label>
                {ruleFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                        <input
                            {...register(`rules.${index}.description`, { required: true })}
                            placeholder="Rule description"
                            className="border flex-1 p-2 rounded"
                        />
                        <button type="button" onClick={() => removeRule(index)} className="text-red-500">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addRule({ description: '' })} className="text-blue-600 text-sm">
                    + Add Rule
                </button>
            </div>

        {/*achievements*/}
            <div>
                <label className="block text-sm font-medium mb-2">Linked Achievements</label>
                {achFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2 items-center bg-gray-50 p-2 rounded">
                        {/* Read-only view of selected achievement */}
                        <span className="font-mono text-sm">{field.code}</span>
                        <span className="text-sm flex-1">{field.description}</span>
                        <button type="button" onClick={() => removeAch(index)} className="text-red-500">Remove</button>
                    </div>
                ))}

                {/* achievement selector dropdown */}
                <select
                    className="border p-2 rounded w-full mt-2"
                    onChange={(e) => {
                        const selected = availableAchievements?.find(a => a.id === e.target.value);
                        if (selected) {
                            addAch({ code: selected.name, description: selected.description }); // Mapping Entity to DTO
                            e.target.value = ""; // Reset dropdown
                        }
                    }}
                >
                    <option value="">Select an achievement to link...</option>
                    {availableAchievements?.map(a => (
                        <option key={a.id} value={a.id}>{a.name} (Value: {a.requiredValue})</option>
                    ))}
                </select>
            </div>

            <div className="pt-4 border-t">
                <button
                    type="submit"
                    disabled={registerGame.isPending}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
                >
                    {registerGame.isPending ? 'Submitting...' : 'Register Game'}
                </button>
            </div>
        </form>
    )
}