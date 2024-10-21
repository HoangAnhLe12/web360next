import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useRef, useState } from 'react';
import * as THREE from 'three';

type UseCreatePointHook = (
   camera: THREE.Camera,
   scene: THREE.Scene,
) => {
   handleMouseClick: (event: ThreeEvent<MouseEvent>) => void;
   selectedPoint: THREE.Vector3 | null;
};

const useCreatePoint: UseCreatePointHook = (camera, scene) => {
   const raycasterRef = useRef(new THREE.Raycaster());
   const mouseRef = useRef(new THREE.Vector2());
   const [selectedPoint, setSelectedPoint] = useState<THREE.Vector3 | null>(null);

   const handleMouseClick = useCallback(
      (event: ThreeEvent<MouseEvent>) => {
         const raycaster = raycasterRef.current;
         const mouse = mouseRef.current;

         // Cập nhật vị trí chuột
         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

         // Cập nhật raycaster
         raycaster.setFromCamera(mouse, camera);
         const intersects = raycaster.intersectObjects(scene.children);

         if (intersects.length > 0) {
            const intersectedPoint = intersects[0].point;

            // Lưu điểm đã chọn
            setSelectedPoint(intersectedPoint);
         }
      },
      [camera, scene],
   );

   return { handleMouseClick, selectedPoint };
};

export default useCreatePoint;
