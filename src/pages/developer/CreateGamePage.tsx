import { useState } from "react";
import { CreateGameForm } from "@/components/developer/CreateGameForm.tsx";

export const CreateGamePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h2>
                    <p className="text-gray-600 mb-8">
                        Your game has been submitted for moderation. An admin will review it shortly.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setIsSuccess(false)} // Reset to add another
                            className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Submit Another Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Submit a New Game</h1>
                    <p className="mt-2 text-gray-600">Fill out the details below to publish your game on the platform.</p>
                </div>
                <CreateGameForm onSuccess={() => setIsSuccess(true)} />
            </div>
        </div>
    )
}