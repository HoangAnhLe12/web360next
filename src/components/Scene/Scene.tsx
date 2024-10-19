'use client';
import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import Dome from './components/Dome';
import { handleWheel } from './components/Control';
import Point from './components/Point';

interface Image {
   url: string; // Thay vì chỉ dùng chuỗi, chúng ta định nghĩa cấu trúc cho các hình ảnh
}

interface DataItem {
   id: number;
   title: string;
   description: string;
   url: string;
   thumbnail: string;
   audio: string;
   setting: {
      radius: number;
      widthSegments: number;
      heightSegments: number;
      rotate: boolean;
      isZoom: boolean;
      enableDamping: boolean;
      rotateSpeed: number;
      position: [number, number, number];
      far: number;
      dampingFactor: number;
      near: number;
      fov: number;
   };
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

interface SceneProps {
   data: DataItem;
   points: Points[];
   onChangeScene: (targetId: number) => void;
}

function Scene({ data, points, onChangeScene }: SceneProps) {
   const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

   const map = useLoader(THREE.TextureLoader, data.url);

   const [rotate, setRotate] = React.useState(data.setting.rotate);

   const isZoom = data.setting.isZoom;

   const isHavePoints = points.length > 0;

   return (
      <Canvas
         onClick={() => setRotate(false)}
         className="h-[500px]"
         onWheel={(event) => handleWheel(event, isZoom, cameraRef.current)}
      >
         <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={data.setting.fov}
            aspect={window.innerWidth / window.innerHeight}
            near={data.setting.near}
            far={data.setting.far}
            position={data.setting.position}
         />
         <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={data.setting.enableDamping}
            dampingFactor={data.setting.dampingFactor}
            autoRotate={rotate}
            rotateSpeed={data.setting.rotateSpeed}
         />
         <Suspense fallback={null}>
            <group>
               <Dome map={map} args={[data.setting.radius, data.setting.widthSegments, data.setting.heightSegments]} />
               {isHavePoints &&
                  points.map((point) => <Point key={point.id} data={point} onChangeScene={onChangeScene} />)}
            </group>
         </Suspense>
      </Canvas>
   );
}

export default Scene;
