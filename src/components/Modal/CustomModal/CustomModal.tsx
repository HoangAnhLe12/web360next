'use client';
import { useEffect, useState } from 'react';
import { CloseOutlined, LoadingOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useImagesWithId } from '@/hooks/api/useImage';
import { useImagePoints } from '@/hooks/api/usePoints';
import { Flex, Spin, Result, Button, ConfigProvider } from 'antd';
import Scene from '@/components/Scene/Scene';

interface CustomModalProps {
   isOpen: boolean;
   onClose: () => void;
   id: number;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, id }) => {
   const [currentId, setCurrentId] = useState(id); // Quản lý id hiện tại
   const handleChangeScene = (targetId: number) => {
      setCurrentId(targetId); // Cập nhật id mới để gọi lại API
   };
   const [isFullScreen, setIsFullScreen] = useState(false);

   const {
      isSuccess: imageSuccess,
      data: image,
      isPending: imagePending,
      isError: imageError,
   } = useImagesWithId(currentId, isOpen);

   const {
      isSuccess: pointsSuccess,
      data: points,
      isPending: pointsPending,
      isError: pointsError,
   } = useImagePoints(currentId, isOpen);

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         setCurrentId(id); // Reset id khi đóng modal
         document.body.style.overflow = 'auto';
      }
      return () => {
         document.body.style.overflow = 'auto';
      };
   }, [currentId, id, isOpen]);

   if (!isOpen) return null;
   const toggleFullscreen = () => {
      if (!isFullScreen) {
         // Chuyển sang chế độ toàn màn hình
         document.documentElement.requestFullscreen();
      } else {
         // Thoát chế độ toàn màn hình
         document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen); // Cập nhật trạng thái
   };

   const isLoading = imagePending || pointsPending;
   const isError = imageError || pointsError;
   const isSuccess = imageSuccess && pointsSuccess && image && points;

   return (
      <div className="fixed inset-0 w-[100vw] top-0 bottom-0 left-0 right-0 z-[1000] flex flex-col items-center justify-center bg-[#000000e6]">
         <div className="right-0 top-0 mr-[17px] mt-[19px] absolute z-10 text-[#fff] text-[22px] hover:text-[red]">
            {!isFullScreen && <CloseOutlined onClick={onClose} />}
         </div>
         <div
            className={`right-0 top-0 ${
               isFullScreen ? `mr-[20px] mt-[5px] text-[35px]` : `mr-[20px] mt-[80px] text-[30px]`
            } absolute z-10 text-[#fffffffb]  hover:text-[#eb8e8e]`}
            onClick={toggleFullscreen}
         >
            {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
         </div>
         <div
            className={`flex items-center justify-center w-full border border-solid ${
               isFullScreen ? `h-full` : `h-screen md:h-[500px] lg:h-[650px] xl:h-[795px] `
            } border-[#fff]`}
         >
            {isLoading && (
               <Flex align="center" justify="center">
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
               </Flex>
            )}
            {isError && (
               <ConfigProvider
                  theme={{
                     token: {
                        colorTextHeading: '#fff',
                        colorTextDescription: '#fff',
                     },
                  }}
               >
                  <Result
                     status="error"
                     title="Submission Failed"
                     subTitle="Please check and modify the following information before resubmitting."
                     extra={[
                        <Button type="primary" onClick={() => window.location.reload()} key="reload">
                           Reload
                        </Button>,
                     ]}
                  />
               </ConfigProvider>
            )}
            {isSuccess && <Scene data={image[0]} points={points} onChangeScene={handleChangeScene} />}
         </div>
      </div>
   );
};

export default CustomModal;
