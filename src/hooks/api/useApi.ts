import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { message } from 'antd';

//Get api images with id
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

//Get api images
export const useImages = (endpoint: string) => {
   return useQuery({
      queryKey: [`${endpoint}`],
      queryFn: async () => {
         const response = await axiosInstance.get(`/${endpoint}`);
         return response.data;
      },
   });
};

//Get api points
export const useImagePoints = (imageId: number | string, isOpen: boolean) => {
   return useQuery({
      queryKey: ['points', imageId],
      queryFn: async () => {
         const response = await axiosInstance.get(`points/?idImage=${imageId}`);
         return response.data;
      },
      enabled: isOpen && imageId != undefined, // Chỉ kích hoạt gọi API khi imageId không phải là null
   });
};

//Post api posts

// Define the data type for item
interface Item {
   id?: number; // ID may not be needed when adding a new item
   title: string;
   description: string;
   thumbnail: string;
   startImage?: string | number; // Thêm trường startId, có thể là chuỗi hoặc undefined
   audio?: string; // Thêm trường audio, có thể là chuỗi hoặc undefined
}

// Function to add a new item
const addItem = async (item: Item) => {
   const newItem = {
      ...item, // sao chép các trường từ item
      startImage: '', // trường startId mặc định là chuỗi rỗng
      audio: '', // trường audio mặc định là chuỗi rỗng
   };
   const { data: response } = await axiosInstance.post('http://localhost:3001/items', newItem);
   return response.data;
};

export const useAddItem = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: addItem,
      onSuccess: (res) => {
         queryClient.invalidateQueries({ queryKey: ['items'] });
         console.log(res);
         message.success('Add item success');
      },
      onError: (err) => {
         console.log(err);
      },
   });
};
