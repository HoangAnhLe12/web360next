import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export const useImagePoints = (imageId: number | null) => {
   return useQuery({
      queryKey: ['points', imageId],
      queryFn: async () => {
         const response = await axiosInstance.get(`points/?idImage=${imageId}`);
         return response.data;
      },
      enabled: !!imageId, // Chỉ kích hoạt gọi API khi imageId không phải là null
   });
};
