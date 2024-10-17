/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, startTransition } from 'react';
import { Card } from 'antd';
import CustomModal from '@/components/Modal/CustomModal/CustomModal';
// import InfoModal from '../Modal/Modal';
// import Image from 'next/image';
interface DataItem {
   id: number;
   title: string;
   description: string;
   url: string;
   thumbnail: string;
   audio: string;
   setting: {
      rotate: boolean;
      isZoom: boolean;
      enableDamping: boolean;
      rotateSpeed: number;
      position: [number, number, number];
      far: number;
      dampingFactor: number;
      near: number;
      fov: number;
      args: [number, number, number];
   };
}

interface CardItemProps {
   item: DataItem;
   points: unknown;
}

const CardItem: React.FC<CardItemProps> = ({ item, points }) => {
   const [open, setOpen] = useState(false);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [loading, setLoading] = useState(true);
   const toggleModal = () => {
      setOpen(!open);
   };
   const showLoading = () => {
      setOpen(true);
      setLoading(true);
      // Simple loading mock. You should add cleanup logic in real world.
      // Giả lập việc tải dữ liệu (ví dụ gọi API)
      startTransition(() => {
         setTimeout(() => {
            setLoading(false);
         }, 2000);
      });
   };
   return (
      <>
         <Card
            onClick={showLoading}
            style={{
               width: '100%',
               border: '1px solid #f0f0f0',
               cursor: 'pointer',
            }}
            cover={
               <img
                  className="w-[100%] max-h-[298px] object-cover border border-solid border-[#f0f0f0]"
                  alt="example"
                  src={item.thumbnail}
               />
            }
         >
            <div className="pb-[15px]">
               <h2 className="text-[40px] font-[600]">{item.title}</h2>
               <p className="text-[22px]">{item.description}</p>
            </div>
         </Card>
         <CustomModal isOpen={open} onClose={toggleModal} data={item} points={points} />
      </>
   );
};

export default CardItem;
