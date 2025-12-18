import React, {useState, useEffect} from "react";
import {ImageIcon, Type, Hash, AlignLeft, Plus, Loader2, LucideCheckCircle, Target} from "lucide-react";
import {useCreateAchievement} from "@/hooks/achievement/useAchievements.ts";
import {AchievementType, type CreateAchievementRequest, ACHIEVEMENT_TYPES_LABELS} from "@/types/achievement.type.ts";
import {Button} from "@/components/ui/Button.tsx";

export const CreatePlatformAchievements = () => {
    const { mutate, isPending, isSuccess, reset } = useCreateAchievement();

    const [formData, setFormData] = useState<CreateAchievementRequest>({
        achievementName: "",
        description: "",
        pictureUrl: "",
        achievementType: AchievementType.PLAY_COUNT, // Default enum value
        requiredValue: 0
    })

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setFormData({
                    achievementName: "",
                    description: "",
                    pictureUrl: "",
                    achievementType: AchievementType.PLAY_COUNT,
                    requiredValue: 0
                });
                reset(); // Reset React Query mutation state
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, reset])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'requiredValue' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

    const boxClass = "bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl p-4 flex flex-col justify-center transition-all duration-300 hover:border-indigo-500/30 hover:bg-zinc-900/80 group focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50 shadow-sm";
    const labelClass = "text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2";
    const inputClass = "bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-600 w-full font-medium focus:ring-0 p-0";

    return (
        <form onSubmit={handleSubmit} className="w-full">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)]">

                <div className={`${boxClass} md:col-span-2`}>
                    <label className={labelClass}>
                        <Type size={14} className="text-indigo-400"/> Name
                    </label>
                    <input
                        type="text"
                        name="achievementName"
                        value={formData.achievementName}
                        onChange={handleChange}
                        placeholder="e.g. Social Butterfly"
                        className={`${inputClass} text-lg`}
                        required
                        maxLength={100}
                    />
                </div>

                <div className={`${boxClass} md:col-span-1`}>
                    <label className={labelClass}>
                        <Hash size={14} className="text-emerald-400"/> Type
                    </label>
                    <select
                        name="achievementType"
                        value={formData.achievementType}
                        onChange={handleChange}
                        className={`${inputClass} text-sm cursor-pointer [&>option]:bg-zinc-900`}
                    >
                        {Object.values(AchievementType).map((type) => (
                            <option key={type} value={type}>
                                {ACHIEVEMENT_TYPES_LABELS[type]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={`${boxClass} md:col-span-1`}>
                    <label className={labelClass}>
                        <Target size={14} className="text-amber-400"/> Threshold
                    </label>
                    <input
                        type="number"
                        name="requiredValue"
                        value={formData.requiredValue}
                        onChange={handleChange}
                        className={`${inputClass} text-2xl font-mono text-amber-400`}
                        min="0"
                        required
                    />
                </div>

                <div className={`${boxClass} md:col-span-2 md:row-span-2 justify-start`}>
                    <label className={labelClass}>
                        <AlignLeft size={14} className="text-blue-400"/> Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe how to unlock this achievement..."
                        className={`${inputClass} resize-none h-full text-sm leading-relaxed`}
                        required
                        maxLength={500}
                    />
                </div>

                <div className={`${boxClass} md:col-span-2 md:row-span-2 relative overflow-hidden`}>
                    <div className="z-10 relative h-full flex flex-col">
                        <label className={labelClass}>
                            <ImageIcon size={14} className="text-pink-400"/> Icon URL
                        </label>
                        <input
                            type="url"
                            name="pictureUrl"
                            value={formData.pictureUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={`${inputClass} text-sm mb-2`}
                            required
                        />
                        <div className="flex-grow rounded-lg border-2 border-dashed border-zinc-700/50 flex items-center justify-center bg-black/20 overflow-hidden relative group-hover:border-zinc-600 transition-colors">
                            {formData.pictureUrl ? (
                                <img
                                    src={formData.pictureUrl}
                                    alt="Preview"
                                    className="h-full w-full object-contain p-2 drop-shadow-lg"
                                    onError={(e) => (e.currentTarget.src = "")}
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-zinc-700">
                                    <ImageIcon size={24} className="opacity-20" />
                                    <span className="text-xs">No image preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"/>
                </div>

                <Button
                    type="submit"
                    disabled={isPending || isSuccess}
                    className={`
                        md:col-span-4 p-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300
                        ${isSuccess
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.99]"
                    }
                    `}
                >
                    {isPending ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                    ) : isSuccess ? (
                        <>
                            <LucideCheckCircle className="w-5 h-5" /> Achievement Created!
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" /> Create Achievement
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}