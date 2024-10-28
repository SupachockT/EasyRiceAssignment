import { useQuery } from 'react-query';
import axios from 'axios';

const fetchStandards = async () => {
    const response = await axios.get('http://localhost:5000/get/standard');
    return response.data;
};

export const useStandards = () => {
    return useQuery('standards', fetchStandards);
};
