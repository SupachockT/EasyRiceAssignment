import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAllHistory = async () => {
    const response = await axios.get('http://localhost:5000/get/history');
    return response.data;
};

const useAllHistory = () => {
    return useQuery('allHistory', fetchAllHistory, {
        staleTime: 0, // Data is fresh immediately
        cacheTime: 60000, // Still cache for 1 minute
        refetchOnWindowFocus: true, // Refetch when window gains focus
        refetchInterval: 10000, // Refetch every 10 seconds
    });
};

export default useAllHistory;
