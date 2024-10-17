'use client';
import React, { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import Dome from './components/Dome';
import { handleWheel } from './components/Control';
import { initialData } from '@/Data/Data';
import Point from './components/Point';

function Scene() {
   const [which, setWhich] = useState(0);
   const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

   const data = initialData;

   const isZoom = true;

   const isHavePoints = data[which].points.length > 0;

   const radius = 500;
   const widthSegments = 60;
   const heightSegments = 40;

   const maps = useLoader(
      THREE.TextureLoader,
      data.map((entry) => entry.url.src),
   );

   return (
      <Canvas onWheel={(event) => handleWheel(event, isZoom, cameraRef.current)}>
         <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={1}
            far={1100}
            position={[0, 0, 5]}
         />
         <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            autoRotate={false}
            rotateSpeed={-0.1}
         />
         <Suspense fallback={null}>
            <group>
               <Dome
                  map={maps[which]}
                  args={[radius, widthSegments, heightSegments]}
                  // onDoubleClick={handleCreatePoint}
               />
               {isHavePoints &&
                  data[which].points.map((point, index) => (
                     <Point
                        type={point.type}
                        position={point.position}
                        data={point.data}
                        key={index}
                        onClick={setWhich}
                     />
                  ))}
            </group>
         </Suspense>
      </Canvas>
   );
}

export default Scene;
