import { useQuery } from 'react-query';
import axios from 'axios';

const fetchHistoryById = async (id) => {
    const response = await axios.get(`http://localhost:5000/get/history/${id}`);
    return response.data;
};

export const useHistory = (id) => {
    return useQuery(['history', id], () => fetchHistoryById(id), {
        enabled: !!id,
    });
};