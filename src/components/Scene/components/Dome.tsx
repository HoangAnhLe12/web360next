'use client';
import * as THREE from 'three';

interface DomeProps {
   map: THREE.Texture;
   args: [number, number, number];
   // onDoubleClick: (event: ThreeEvent<MouseEvent>) => void;
}
function Dome({ map, args }: DomeProps) {
   return (
      <mesh>
         <sphereGeometry attach="geometry" args={args} />
         <meshBasicMaterial attach="material" map={map} side={THREE.BackSide} />
      </mesh>
   );
}

export default Dome;
