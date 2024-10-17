'use client';

import { TextureLoader, BackSide } from 'three';
import { Suspense, useState } from 'react';
import { Layout } from 'antd';
import { Canvas, useLoader } from '@react-three/fiber';
import images from '@/public/images/Images';
import { OrbitControls } from '@react-three/drei';
import Link from 'next/link';
// import Image from 'next/image';

const data = [images.bedroom, images.sea, images.snow];
function HomePage() {
   const [which, set] = useState(0);
   const maps = useLoader(
      TextureLoader,
      data.map((entry) => entry.src),
   );
   return (
      <Layout style={{ height: '100vh' }}>
         <div className="flex flex-col items-center justify-center absolute z-[999] w-[100%] h-[100%] text-[#fff] pointer-events-none">
            <h1 className="text-[50px] font-[700]">Virtual Tours Made Simple</h1>
            <p className="text-[20px] font-[400] mx-0 mt-[15px] mb-[25px]">
               If you have a place to go when being tired, it is your home
            </p>
            <Link href="/showcase">
               <button className="mt-[35px] w-[200px] text-[#fff] text-[17px] px-[25px] py-[15px] font-[600] bg-[#389af0] border border-solid border-[#fff3] rounded-[50px] shadow-none m-[10px] cursor-pointer pointer-events-auto hover:opacity-[0.8] ">
                  TRY FOR FREE{' '}
               </button>
            </Link>
            <Link href="/showcase">
               <button className="mt-5 w-[200px] text-[#fff] text-[17px] px-[25px] py-[15px] font-[600] bg-[#0000004d] border border-solid border-[#fff3] rounded-[50px] shadow-none m-[10px] cursor-pointer pointer-events-auto hover:opacity-[0.8] ">
                  MORE INFO{' '}
               </button>
            </Link>
            <div className="flex flex-row absolute bottom-[40px] mt-5 mb-5">
               <div
                  className="flex justify-center items-center flex-col ml-[30px] mr-[30px] cursor-pointer pointer-events-auto"
                  onClick={() => set(0)}
               >
                  <p>Nature</p>
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                     className="w-[70px] h-[70px] rounded-[50%] object-cover mt-[5px] block"
                     src="https://storage.googleapis.com/xxd6-x9vs-v21v.n7.xano.io/vault/VK6NBzth/hxxJmIl1hpDP8WriRRss4LX6Z3k/fYRH-A../17ea0864/livingroom%20panorama.jpg"
                     alt="logo"
                  />
               </div>
               <div
                  className="flex justify-center items-center flex-col ml-[30px] mr-[30px] cursor-pointer pointer-events-auto"
                  onClick={() => set(1)}
               >
                  <p>House</p>
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                     className="w-[70px] h-[70px] rounded-[50%] object-cover mt-[5px] block"
                     src="https://storage.googleapis.com/xxd6-x9vs-v21v.n7.xano.io/vault/VK6NBzth/hxxJmIl1hpDP8WriRRss4LX6Z3k/fYRH-A../17ea0864/livingroom%20panorama.jpg"
                     alt="logo"
                  />
               </div>
               <div
                  className="flex justify-center items-center flex-col ml-[30px] mr-[30px] cursor-pointer pointer-events-auto"
                  onClick={() => set(2)}
               >
                  <p>Service</p>
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                     className="w-[70px] h-[70px] rounded-[50%] object-cover mt-[5px] block"
                     src="https://storage.googleapis.com/xxd6-x9vs-v21v.n7.xano.io/vault/VK6NBzth/JALMTymWk9fm76zqTBkAPtLcPJE/--cniw../17ea0864/fantasy_landscape_koalas_in_a_jungle.jpeg"
                     alt="logo"
                  />
               </div>
            </div>
         </div>
         <Canvas>
            <OrbitControls
               enableZoom={false}
               enablePan={false}
               enableDamping
               dampingFactor={0.2}
               autoRotate={false}
               rotateSpeed={-0.1}
            />
            <Suspense fallback={null}>
               <mesh>
                  <sphereGeometry attach="geometry" args={[500, 60, 40]} />
                  <meshBasicMaterial attach="material" map={maps[which]} side={BackSide} />
               </mesh>
            </Suspense>
         </Canvas>
      </Layout>
   );
}

export default HomePage;
