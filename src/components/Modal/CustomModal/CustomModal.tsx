'use client';
import React, { useEffect } from 'react';
import { BackSide, TextureLoader } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { CloseOutlined } from '@ant-design/icons';
import { OrbitControls } from '@react-three/drei';

interface CustomModalProps {
   isOpen: boolean;
   onClose: () => void;
   data: { title: string; url: string };
   points: unknown;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, data, points }) => {
   console.log(points);
   const map = useLoader(TextureLoader, data.url);
   useEffect(() => {
      if (isOpen) {
         // Vô hiệu hóa cuộn trên body khi modal mở
         document.body.style.overflow = 'hidden';
      } else {
         // Khôi phục cuộn trên body khi modal đóng
         document.body.style.overflow = 'auto';
      }

      // Khôi phục giá trị ban đầu khi component unmount
      return () => {
         document.body.style.overflow = 'auto';
      };
   }, [isOpen]);
   if (!isOpen) return null; // Không hiển thị modal nếu isOpen là false

   return (
      <div className="fixed inset-0 w-[100vw] top-0 bottom-0 left-0 right-0 z-[1000] flex flex-col items-center justify-center bg-[#000000e6]">
         <div className="right-0 top-0 mr-[32px] mt-[25px] absolute z-10 text-[#fff] text-[22px] hover:text-[red]">
            <CloseOutlined className="" onClick={onClose} />
         </div>
         <div className="w-full border border-solid border-[#fff]">
            <Canvas style={{ height: '485px' }}>
               <mesh>
                  <OrbitControls
                     enableZoom={false}
                     enablePan={false}
                     enableDamping
                     dampingFactor={0.2}
                     autoRotate={false}
                     rotateSpeed={-0.1}
                  />
                  <sphereGeometry attach="geometry" args={[500, 60, 40]} />
                  <meshBasicMaterial attach="material" map={map} side={BackSide} />
               </mesh>
            </Canvas>
         </div>
      </div>
   );
};

export default CustomModal;
