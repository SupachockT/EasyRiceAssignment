import { useMutation, useQueryClient } from "react-query";
import api from "../api/api";

const useSubmitData = () => {
    const queryClient = useQueryClient(); // Get the query client

    return useMutation(
        (formData) => {
            return api.post('/POST/history', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        {
            onError: (error) => {
                console.error('Error submitting data:', error);
            },
            onSuccess: (data) => {
                console.log(data.message);
                queryClient.invalidateQueries('allHistory'); // Refetch allHistory query
            },
        }
    );
};

export default useSubmitData;
