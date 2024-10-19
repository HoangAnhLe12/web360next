import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useRef } from 'react';
import * as THREE from 'three';

type UseCreatePointHook = (camera: THREE.Camera, scene: THREE.Scene) => (event: ThreeEvent<MouseEvent>) => void;

const useCreatePoint: UseCreatePointHook = (camera, scene) => {
   const raycasterRef = useRef(new THREE.Raycaster());
   const mouseRef = useRef(new THREE.Vector2());

   return useCallback(
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

            console.log('Điểm đã chọn: ', intersectedPoint);
         }
      },
      [camera, scene],
   );
};

export default useCreatePoint;
