'use client';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { BackSide, TextureLoader } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';

interface InfoModalProps {
   open: boolean;
   loadingCard: boolean;
   onClose: () => void;
   data: { title: string; url: string };
   screen: boolean;
}

export default function InfoModal({ open, loadingCard, onClose, data, screen }: InfoModalProps) {
   const map = useLoader(TextureLoader, data.url);
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
            width={screen ? '100vw' : '50vw'}
            open={open}
            loading={screen ? loadingCard : false}
            title={!screen ? data.title : null}
            onCancel={onClose}
            footer={
               !screen
                  ? [
                       <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
                          MoreInfo
                       </Button>,
                    ]
                  : null
            }
         >
            {screen ? (
               <Canvas style={{ height: '485px' }}>
                  <mesh>
                     <sphereGeometry attach="geometry" args={[500, 60, 40]} />
                     <meshBasicMaterial attach="material" map={map} side={BackSide} />
                  </mesh>
               </Canvas>
            ) : (
               <>
                  <p>Content</p>
                  <p>Content</p>
               </>
            )}
         </Modal>
      </>
   );
}
