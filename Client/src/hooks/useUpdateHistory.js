import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from "../api/api";

const useUpdateHistory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(
        async ({ id, data }) => {
            const response = await api.put(`/edit/editHistory/${id}`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log("Update successful:", data);
                queryClient.invalidateQueries('allHistory');
                navigate('/result')
            },
            onError: (error) => {
                console.error("Error updating history:", error);
            },
        }
    );

    return {
        updateHistory: mutation.mutate,           // To trigger the mutation
        isLoading: mutation.isLoading,             // Loading state
        error: mutation.error,                     // Error state
        isSuccess: mutation.isSuccess              // Success state
    };
};

export default useUpdateHistory;
