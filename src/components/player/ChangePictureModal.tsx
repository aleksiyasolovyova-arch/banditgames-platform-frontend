import { useState } from 'react';
import { useChangePlayerPicture } from '@/hooks/player/useChangePlayerPicture'; // Ensure this exists
import { Button } from "@/components/ui/Button.tsx";
import { Loader2, Image as ImageIcon, X } from "lucide-react";

interface ChangePictureModalProps {
    currentPictureUrl: string;
    username: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePictureModal = ({
                                       currentPictureUrl,
                                       username,
                                       isOpen,
                                       onClose,
                                   }: ChangePictureModalProps) => {
    const [pictureUrl, setPictureUrl] = useState(currentPictureUrl);
    const [previewUrl, setPreviewUrl] = useState(currentPictureUrl);
    const [error, setError] = useState<string | null>(null);

    const { mutate, isPending } = useChangePlayerPicture();

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPictureUrl(e.target.value);
        setError(null);
    };

    const handlePreview = () => {
        if (!pictureUrl.trim()) {
            setError('Please enter a valid URL');
            return;
        }
        setPreviewUrl(pictureUrl);
    };

    const handleSave = () => {
        if (!pictureUrl.trim()) return;

        mutate(pictureUrl, {
            onSuccess: () => {
                onClose();
            },
            onError: () => {
                setError('Failed to update picture.');
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={onClose}>
            <div
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ImageIcon className="text-indigo-500" /> Change Profile Picture
                </h2>

                <div className="flex justify-center mb-6">
                    <div className="relative group">
                        <img
                            src={previewUrl}
                            alt={username}
                            className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 bg-zinc-950 shadow-lg"
                            onError={(e) => {
                                setError('Failed to load image');
                                e.currentTarget.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium mb-1.5 text-zinc-400 uppercase tracking-wider">
                            Image URL
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={pictureUrl}
                                onChange={handleUrlChange}
                                placeholder="https://..."
                                disabled={isPending}
                                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600"
                            />
                            <Button
                                onClick={handlePreview}
                                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                            >
                                Preview
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isPending}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                            {isPending ? 'Saving...' : 'Save Change'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};