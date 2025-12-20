import { useState } from "react";
import { CreateGameForm } from "@/components/developer/CreateGameForm.tsx";
import {ArrowLeft, CheckCircle2, Gamepad2} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateGamePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 bg-zinc-900 border border-zinc-800 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 animate-in zoom-in duration-500">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Submission Received!</h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Your game has been queued for moderation. Our admin team will review the code and assets shortly.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-lg transition-colors border border-zinc-700"
                        >
                            Submit Another Game
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="text-zinc-500 hover:text-white text-sm font-medium py-2 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 relative">

            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 mb-4 backdrop-blur-sm shadow-lg">
                        <Gamepad2 className="text-indigo-400 w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Submit New Game</h1>
                    <p className="mt-3 text-lg text-zinc-400 max-w-xl mx-auto">
                        Fill out the technical details below to publish your game to the arcade platform.
                    </p>
                </div>

                <CreateGameForm onSuccess={() => setIsSuccess(true)} />

                <div className="mt-8 text-center">
                    <button onClick={() => navigate('/')} className="text-zinc-500 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors">
                        <ArrowLeft size={14} /> Back to Landing Page
                    </button>
                </div>
            </div>
        </div>
    )
}