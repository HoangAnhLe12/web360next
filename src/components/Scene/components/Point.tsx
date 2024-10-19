import { useState } from 'react';
import { Html } from '@react-three/drei';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined, RedoOutlined } from '@ant-design/icons';
import InfoModal from '@/components/Modal/Modal';

interface Image {
   url: string;
}

interface PointsPopup {
   id: number | string;
   title: string;
   description: string;
   position: [number, number, number];
   type: string;
   videoId: string;
   audioId: string;
   images: Image[];
}

interface PointsGate {
   id: number | string;
   title: string;
   position: [number, number, number];
   type: string;
   targetId: number;
}

type Points = PointsPopup | PointsGate;

interface PointProps {
   data: Points;
   onChangeScene: (targetId: number) => void;
}

function Point({ data, onChangeScene }: PointProps) {
   const [hovered, setHovered] = useState(false);
   const [open, setOpen] = useState(false);

   const onClose = () => {
      setOpen(false);
   };

   const typeData = data.type === 'popup';

   const handleMouseClick = () => {
      if (typeData) {
         setOpen(true); // Mở modal cho loại popup
      } else if (data.type === 'gate' && 'targetId' in data) {
         onChangeScene(data.targetId); // Chuyển cảnh cho loại gate
      }
   };

   return (
      <group>
         <mesh scale={[2, 2, 2]} position={data.position} onPointerOut={() => setHovered(false)}>
            <Html>
               {typeData ? (
                  <QuestionCircleOutlined
                     className="cursor-pointer"
                     style={{ color: 'red', fontSize: '30px' }}
                     onClick={handleMouseClick}
                     onMouseOut={() => setHovered(false)}
                     onMouseOver={() => setHovered(true)}
                  />
               ) : (
                  <RedoOutlined
                     className="cursor-pointer"
                     style={{ color: 'red', fontSize: '30px' }}
                     onClick={handleMouseClick}
                     onMouseOut={() => setHovered(false)}
                     onMouseOver={() => setHovered(true)}
                  />
               )}
            </Html>
            {hovered && (
               <Html center>
                  <Tooltip title={data.title} color="blue" open={hovered}>
                     <div style={{ width: '0px', height: '0px' }} />
                  </Tooltip>
               </Html>
            )}
         </mesh>
         {typeData && open && (
            <Html>
               <InfoModal open={open} onClose={onClose} data={data} />
            </Html>
         )}
      </group>
   );
}

export default Point;
