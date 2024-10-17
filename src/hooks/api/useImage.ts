import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export const useImages = () => {
   return useQuery({
      queryKey: ['images'],
      queryFn: async () => {
         const response = await axiosInstance.get('/images');
         return response.data;
      },
   });
};
