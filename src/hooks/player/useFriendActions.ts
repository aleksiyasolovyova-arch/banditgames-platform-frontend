import { useState } from 'react';
import {useSendFriendRequest} from "@/hooks/player/useFriends.ts";

export function useAddFriend() {
    const [message, setMessage] = useState('');
    const sendMutation = useSendFriendRequest();

    const sendRequest = async (recipientUsername: string): Promise<boolean> => {
        try {
            await sendMutation.mutateAsync(recipientUsername);
            setMessage('Friend request sent successfully!');
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage('An unexpected error occurred');
            }
            return false;
        }
    }

    const resetStatus = () => {
        setMessage('');
    }

    return { sendRequest,
        resetStatus,
        isLoading: sendMutation.isPending,
        status: sendMutation.isError ? 'error' : sendMutation.isSuccess ? 'success' : 'idle',
        message,
    }
}