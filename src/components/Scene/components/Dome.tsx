'use client';
import useCreatePoint from '@/hooks/useCreatePoint';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface DomeProps {
   map: THREE.Texture;
   args: [number, number, number];
}
function Dome({ map, args }: DomeProps) {
   const { camera, scene } = useThree();

   const { handleMouseClick, selectedPoint } = useCreatePoint(camera, scene);

   console.log(selectedPoint);

   return (
      <mesh onDoubleClick={handleMouseClick}>
         <sphereGeometry attach="geometry" args={args} />
         <meshBasicMaterial attach="material" map={map} side={THREE.BackSide} />
      </mesh>
   );
}

export default Dome;
