import { useMutation, useQueryClient } from 'react-query';
import api from '../api/api';

const useDelHistory = () => {
    const queryClient = useQueryClient(); // Get the query client

    const mutation = useMutation(
        async (id) => {
            const response = await api.delete(`http://localhost:5000/del/history/${id}`);
            return response.data;
        },
        {
            onError: (error) => {
                console.error('Error deleting history record:', error);
            },
            onSuccess: (data) => {
                console.log(data.message);
                queryClient.invalidateQueries('allHistory'); // Refetch allHistory query
            },
        }
    );

    return {
        loading: mutation.isLoading,
        error: mutation.isError ? mutation.error.message : null,
        deleteHistoryRecord: mutation.mutate,
    };
};

export default useDelHistory;
