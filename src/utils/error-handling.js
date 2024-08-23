import { toast } from 'sonner';

export const handleFormErrors = (error, setError) => {
    const { response } = error;
    
    if (!response) {
        toast.error('An error occurred. Please try again later.');
        return;
    }

    const { status, data } = response;

    switch (status) {
        case 422: {
            const { messages } = data;
            messages.forEach(({ path, message }) => {
                setError(path, { type: 'manual', message });
            });
            break;
        }

        case 403: {
            toast.error(`${data.messages} | You are not authorized to access this resource`);
            break;
        }

        case 401: {
            toast.error(`${data.message} | Please log in again.`);
            break;
        }

        case 400: {
            toast.error(`${data.messages}`);
            break;
        }

        default: {
            if (status <= 400 && status >= 500) {
                toast.error(data.message || 'An error occurred. Please try again later.');
            }
            break;
        }
    }
};
