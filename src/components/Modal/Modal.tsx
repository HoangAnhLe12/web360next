'use client';
import { useState } from 'react';
import { Button, Modal } from 'antd';

interface PointsPopup {
   id: number;
   title: string;
   description: string;
   position: [number, number, number];
   type: string;
   videoId: string;
   audioId: string;
   images: string[];
}
interface PointsGate {
   id: number;
   title: string;
   position: [number, number, number];
   type: string;
   targetId: number;
}

type Points = PointsPopup | PointsGate;

interface InfoModalProps {
   open: boolean;
   onClose: () => void;
   data: Points;
}

export default function InfoModal({ open, onClose, data }: InfoModalProps) {
   const [loading, setLoading] = useState(false);

   const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 3000);
   };

   return (
      <>
         <Modal
            centered
            width={'50vw'}
            open={open}
            title={data.title}
            onCancel={onClose}
            footer={[
               <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
                  MoreInfo
               </Button>,
            ]}
         >
            <p>Content</p>
            <p>Content</p>
         </Modal>
      </>
   );
}
