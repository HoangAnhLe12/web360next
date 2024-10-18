/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { Card } from 'antd';
import CustomModal from '@/components/Modal/CustomModal/CustomModal';

interface DataItem {
   id: number;
   startImage: number;
   title: string;
   description: string;
   thumbnail: string;
   audio: string;
}

interface CardItemProps {
   item: DataItem;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
   const [open, setOpen] = useState(false);
   const toggleModal = () => {
      setOpen(!open);
   };
   return (
      <>
         <Card
            onClick={() => setOpen(true)}
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
         <CustomModal isOpen={open} onClose={toggleModal} id={item.startImage} />
      </>
   );
};

export default CardItem;
