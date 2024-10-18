import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export const useImagesWithId = (id: number | string, isOpen: boolean) => {
   return useQuery({
      queryKey: ['images', id],
      queryFn: async () => {
         const response = await axiosInstance.get(`/images?id=${id}`);
         return response.data;
      },
      enabled: isOpen && id != undefined, // Chỉ kích hoạt gọi API khi id không phải là null
   });
};

export const useImages = () => {
   return useQuery({
      queryKey: ['images'],
      queryFn: async () => {
         const response = await axiosInstance.get('/images');
         return response.data;
      },
   });
};
