import { useState } from 'react';
import { friendService } from '@/services/player/friendService';

export function useAddFriend() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const sendRequest = async (username: string) => {
        if (!username.trim()) return;

        setIsLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            const successMsg = await friendService.sendFriendRequest(username);
            setStatus('success');
            setMessage(successMsg);
            return true;
        } catch (err: unknown) {
            setStatus('error');

            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage('An unexpected error occurred');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const resetStatus = () => {
        setStatus('idle');
        setMessage('');
    }

    return { sendRequest, resetStatus, isLoading, status, message };
}