'use client';
import React from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';

// Hàm xử lý sự kiện cuộn chuột
export const handleWheel = (
   event: React.WheelEvent<HTMLDivElement>,
   isZoom: boolean,
   cameraRef: THREE.PerspectiveCamera,
) => {
   if (isZoom && cameraRef) {
      // Lấy camera từ ref và thay đổi fov
      const camera = cameraRef;
      const newFov = MathUtils.clamp(camera.fov + event.deltaY * 0.05, 30, 75);
      camera.fov = newFov;

      // Cập nhật lại ma trận chiếu của camera
      camera.updateProjectionMatrix();
   }
};
