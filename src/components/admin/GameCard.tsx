import type { GameCardProps } from '@/types/game.types.ts'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export const GameCard = ({
                             game,
                             onAccept,
                             onReject,
                             onEdit,
                             loading,
                         }: GameCardProps) => {
    const isActionDisabled = loading[game.id]

    return (
        <div className="bg-status-info-light border:bg-game-border dark:bg-game-card rounded-lg p-5 mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold bg-background-primary dark:bg-status-info-light mb-2">
                        {game.title}
                    </h3>
                    <div className="flex gap-4 flex-wrap text-sm text-gray-600 dark:text-gray-400">
                        <span>Creator: {game.creator}</span>
                    </div>
                </div>
            </div>

            {game.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {game.description}
                </p>
            )}

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={() => onAccept(game.id)}
                    disabled={isActionDisabled}
                    aria-label={`Accept ${game.title}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-status-success hover:bg-status-success-light disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
                >
                    {isActionDisabled ? (
                        <LoadingSpinner />
                    ) : (
                        <span aria-hidden="true">✓</span>
                    )}
                    Accept
                </button>

                <button
                    onClick={() => onReject(game.id)}
                    disabled={isActionDisabled}
                    aria-label={`Reject ${game.title}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-status-danger hover:bg-status-danger-light disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
                >
                    {isActionDisabled ? (
                        <LoadingSpinner />
                    ) : (
                        <span aria-hidden="true">✕</span>
                    )}
                    Reject
                </button>

                <button
                    onClick={() => onEdit(game)}
                    disabled={isActionDisabled}
                    aria-label={`Edit ${game.title}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-status-info hover:bg-status-info-light dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white rounded-md text-sm font-medium transition-colors"
                >
                    <span aria-hidden="true">✎</span>
                    Edit
                </button>
            </div>
        </div>
    )
}