import { useState } from 'react';
import { Html } from '@react-three/drei';
import { Tooltip } from 'antd';

import InfoModal from '@/components/Modal/Modal';

interface PointDataWithId {
   title: string;
   id: number;
}

interface PointDataWithDescription {
   title: string;
   description: string;
}

type PointData = PointDataWithId | PointDataWithDescription;

interface PointProps {
   type: string;
   position: [number, number, number];
   data: PointData;
   onClick: React.Dispatch<React.SetStateAction<number>>;
}

function Point({ type, position, data, onClick }: PointProps) {
   const [hovered, setHovered] = useState(false);
   const [open, setOpen] = useState(false);
   const onClose = () => {
      setOpen(false);
   };

   const typeData = type === 'popup';
   const handleMouseClick = () => {
      if (typeData) {
         setOpen(true);
      } else {
         if ('id' in data) {
            onClick(data.id);
         }
      }
   };

   return (
      <group>
         <mesh
            scale={[1.5, 1.5, 1.5]}
            position={position}
            onClick={handleMouseClick}
            onPointerOver={() => {
               setHovered(true);
               document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => setHovered(false)}
         >
            <sphereGeometry args={[5, 16, 16]} />
            <meshBasicMaterial color="red" opacity={0.7} />
            {hovered && (
               <Html center>
                  <Tooltip title={data.title} color="blue" open={hovered}>
                     <div style={{ width: '0px', height: '0px' }} />
                  </Tooltip>
               </Html>
            )}
         </mesh>

         {/* Sử dụng InfoDrawer */}
         <Html>
            {/* <InfoDrawer open={open} onClose={onClose} data={data} /> */}
            <InfoModal open={open} onClose={onClose} data={data} loadingCard={false} screen={false} />
         </Html>
      </group>
   );
}

export default Point;
