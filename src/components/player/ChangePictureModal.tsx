import { useState } from 'react'
import { useChangePlayerPicture } from '@/hooks/player/useChangePlayerPicture'
import {Button} from "@/components/ui/Button.tsx";

interface ChangePictureModalProps {
    currentPictureUrl: string
    username: string
    isOpen: boolean
    onClose: () => void
}

export const ChangePictureModal = ({
                                       currentPictureUrl,
                                       username,
                                       isOpen,
                                       onClose,
                                   }: ChangePictureModalProps) => {
    const [pictureUrl, setPictureUrl] = useState(currentPictureUrl)
    const [previewUrl, setPreviewUrl] = useState(currentPictureUrl)
    const [error, setError] = useState<string | null>(null)
    const { mutate, isPending } = useChangePlayerPicture()

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value
        setPictureUrl(url)
        setError(null)
    }

    const handlePreview = () => {
        if (!pictureUrl.trim()) {
            setError('Please enter a valid URL')
            return
        }

        try {
            new URL(pictureUrl)
            setPreviewUrl(pictureUrl)
            setError(null)
        } catch {
            setError('Invalid URL format')
        }
    }

    const handleSave = () => {
        if (!pictureUrl.trim()) {
            setError('Please enter a valid URL')
            return
        }

        mutate(pictureUrl, {
            onSuccess: () => {
                onClose()
            },
            onError: () => {
                setError('Failed to update picture. Please try again.')
            },
        })
    }

    const handleCancel = () => {
        setPictureUrl(currentPictureUrl)
        setPreviewUrl(currentPictureUrl)
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleCancel}
        >
            <div
                className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-11/12 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-gray-100">
                    Change Profile Picture
                </h2>

                <div className="flex justify-center mb-6">
                    <img
                        src={previewUrl}
                        alt={username}
                        className="w-40 h-40 rounded-lg object-cover border-2 border-teal-500"
                        onError={() => setError('Failed to load image')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="picture-url" className="block text-sm font-medium mb-2 text-slate-700 dark:text-gray-300">
                        Image URL
                    </label>
                    <input
                        id="picture-url"
                        type="text"
                        value={pictureUrl}
                        onChange={handleUrlChange}
                        placeholder="https://example.com/image.jpg"
                        disabled={isPending}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-gray-100 disabled:opacity-50"
                    />
                </div>

                <Button
                    onClick={handlePreview}
                    disabled={isPending}
                    className="w-full mb-4 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50 transition"
                >
                    Preview
                </Button>

                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-600 dark:text-red-400 rounded text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 mt-6">
                    <Button
                        onClick={handleCancel}
                        disabled={isPending}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isPending || pictureUrl === currentPictureUrl}
                        className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg disabled:opacity-50 transition"
                    >
                        {isPending ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}