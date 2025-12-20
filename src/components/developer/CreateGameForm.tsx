import {useForm, useFieldArray, useWatch} from "react-hook-form";
import { useGameMutations } from "@/hooks/game/useGames.ts";
import type { RegisterGameRequest } from "@/types/game.types.ts";
import {
    Plus,
    Trash2,
    Gamepad2,
    DollarSign,
    User,
    Image as ImageIcon,
    Link,
    Bot,
    ScrollText,
    Trophy,
    Loader2
} from "lucide-react";

export const CreateGameForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const { registerGame } = useGameMutations();

    const { register, control, handleSubmit, formState: { errors } } = useForm<RegisterGameRequest>({
        defaultValues: {
            rules: [{ description: '' }],
            achievements: [{ code: '', description: '' }],
            playableWithAI: false
        }
    })

    const isAiPlayable = useWatch({
        control,
        name: "playableWithAI"
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

    const inputClass = "w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder:text-zinc-600";
    const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-xl">

            <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Gamepad2 className="text-indigo-500" size={20} />
                    <h3 className="text-lg font-bold text-white">Game Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className={labelClass}>Game Title</label>
                        <input {...register("name", { required: true })} placeholder="e.g. Cyber Chess" className={inputClass} />
                        {errors.name && <span className="text-rose-500 text-xs mt-1">Name is required</span>}
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>Description</label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            placeholder="Briefly describe the gameplay..."
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Price (EUR)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: true, min: 0 })}
                                className={`${inputClass} pl-10`}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Creator Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                            <input
                                {...register("gameCreatorName", { required: true })}
                                className={`${inputClass} pl-10`}
                                placeholder="Studio or Dev Name"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <ImageIcon className="text-indigo-500" size={20} />
                    <h3 className="text-lg font-bold text-white">Assets & Config</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Cover Image URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                            <input {...register("pictureUrl")} placeholder="https://..." className={`${inputClass} pl-10`} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Game Content URL</label>
                        <div className="relative">
                            <Link className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                            <input {...register("gameUrl")} placeholder="https://..." className={`${inputClass} pl-10`} />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className={`
                            relative flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                            ${isAiPlayable
                            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }
                        `}>
                            <input
                                type="checkbox"
                                {...register("playableWithAI")}
                                className="peer sr-only"
                            />
                            <div className={`p-2 rounded-lg ${isAiPlayable ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-500'}`}>
                                <Bot size={24} />
                            </div>
                            <div className="flex-1">
                                <span className={`font-bold block ${isAiPlayable ? 'text-emerald-400' : 'text-zinc-300'}`}>
                                    AI Opponent Supported
                                </span>
                            </div>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isAiPlayable ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-700'}`}>
                                {isAiPlayable && <div className="w-2 h-2 bg-black rounded-full" />}
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                        <ScrollText className="text-indigo-500" size={20} />
                        <h3 className="text-lg font-bold text-white">Rules</h3>
                    </div>
                    <button type="button" onClick={() => addRule({ description: '' })} className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                        <Plus size={14} /> Add Rule
                    </button>
                </div>

                <div className="space-y-3">
                    {ruleFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 animate-in slide-in-from-left-2 fade-in duration-300">
                            <span className="flex items-center justify-center w-8 h-10 bg-zinc-900 rounded border border-zinc-800 text-zinc-500 font-mono text-xs">
                                {index + 1}
                            </span>
                            <input
                                {...register(`rules.${index}.description`, { required: true })}
                                placeholder="e.g. Player loses if they run out of time."
                                className={`${inputClass} flex-1`}
                            />
                            <button
                                type="button"
                                onClick={() => removeRule(index)}
                                className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-rose-500 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                        <Trophy className="text-indigo-500" size={20} />
                        <h3 className="text-lg font-bold text-white">Achievements</h3>
                    </div>
                    <button type="button" onClick={() => addAch({ code: '', description: '' })} className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                        <Plus size={14} /> Add Achievement
                    </button>
                </div>

                <div className="space-y-3">
                    {achFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col sm:flex-row gap-2 p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50 animate-in slide-in-from-left-2 fade-in duration-300 group hover:border-zinc-700 transition-colors">
                            <div className="w-full sm:w-1/3">
                                <input
                                    {...register(`achievements.${index}.code`, { required: true })}
                                    placeholder="Code (e.g. FIRST_WIN)"
                                    className={`${inputClass} font-mono text-sm`}
                                />
                            </div>
                            <div className="flex-1 flex gap-2">
                                <input
                                    {...register(`achievements.${index}.description`, { required: true })}
                                    placeholder="Description"
                                    className={`${inputClass}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeAch(index)}
                                    className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-rose-500 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all shrink-0"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
                <button
                    type="submit"
                    disabled={registerGame.isPending}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {registerGame.isPending ? (
                        <> <Loader2 className="animate-spin" size={20}/> Submitting... </>
                    ) : (
                        "Submit Game for Review"
                    )}
                </button>
            </div>
        </form>
    )
}