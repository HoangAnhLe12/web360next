'use client';
import { useState } from 'react';
import { Col, Row } from 'antd';

import CardItem from '@/components/Card/Card';
import { useImages } from '@/hooks/api/useImage';
import { useImagePoints } from '@/hooks/api/usePoints';

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

function ShowcasePage() {
   const { data: images, isPending, error } = useImages();

   const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
   const { data: points, isPending: isPointsLoading } = useImagePoints(selectedImageId);

   if (isPending) return 'Loading...';

   if (error) return 'An error has occurred: ' + error.message;

   if (selectedImageId) {
      if (isPointsLoading) {
         console.log('Loading...');
      } else {
         console.log(points);
      }
   }

   return (
      <>
         <div className="p-[15px] mt-[10px] mb-[30px]">
            <h1 className="text-[65px] font-[600]">360° Showcase</h1>
            <p className="text-[22px] font-[300]">Our favourite tours curated from over 5000+ members</p>
         </div>
         <Row gutter={[48, 40]}>
            {images.map((image: DataItem) => (
               <Col span={12} key={image.id} onClick={() => setSelectedImageId(image.id)}>
                  <CardItem item={image} points={points} />
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ShowcasePage;
