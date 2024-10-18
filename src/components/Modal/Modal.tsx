'use client';
import { useState } from 'react';
import { Button, Carousel, Collapse, Image, Modal, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

interface PointsPopup {
   id: number;
   title: string;
   description: string;
   position: [number, number, number];
   type: string;
   videoId: string;
   audioId: string;
   images: string[];
}
interface PointsGate {
   id: number;
   title: string;
   position: [number, number, number];
   type: string;
   targetId: number;
}

type Points = PointsPopup | PointsGate;

interface InfoModalProps {
   open: boolean;
   onClose: () => void;
   data: Points;
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;
const getItems = (panelStyle: { marginBottom: number; background: string; borderRadius: number; border: string }) => [
   {
      key: '1',
      label: 'Mô tả sản phẩm',
      children: <p>{text}</p>,
      style: panelStyle,
   },
   {
      key: '2',
      label: 'Hình ảnh của sản phẩm',
      children: (
         <Carousel arrows infinite={false}>
            <div>
               <div
                  style={{
                     margin: 0,
                     height: '160px',
                     color: '#fff',
                     lineHeight: '160px',
                     textAlign: 'center',
                     background: '#364d79',
                  }}
               >
                  {/* eslint-disable-next-line jsx-a11y/alt-text*/}
                  <Image
                     style={{ background: '#364d79' }}
                     width={100}
                     height={100}
                     src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
               </div>
            </div>
            <div>
               <h3
                  style={{
                     margin: 0,
                     height: '160px',
                     color: '#fff',
                     lineHeight: '160px',
                     textAlign: 'center',
                     background: '#364d79',
                  }}
               ></h3>
            </div>
            <div>
               <h3
                  style={{
                     margin: 0,
                     height: '160px',
                     color: '#fff',
                     lineHeight: '160px',
                     textAlign: 'center',
                     background: '#364d79',
                  }}
               >
                  1
               </h3>
            </div>
         </Carousel>
      ),
      style: panelStyle,
   },
   {
      key: '3',
      label: 'Video của sản phẩm',
      children: (
         <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Igg7AxN5QPc?si=r6EzPEPDe51ouWaL"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
         ></iframe>
      ),
      style: panelStyle,
   },
];

export default function InfoModal({ open, onClose, data }: InfoModalProps) {
   const { token } = theme.useToken();
   const panelStyle = {
      marginBottom: 24,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none',
   };
   const [loading, setLoading] = useState(false);

   const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 3000);
   };

   return (
      <>
         <Modal
            centered
            width={'50vw'}
            open={open}
            title={data.title}
            onCancel={onClose}
            footer={[
               <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
                  MoreInfo
               </Button>,
            ]}
         >
            <Collapse
               bordered={false}
               defaultActiveKey={['2']}
               expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
               style={{
                  background: token.colorBgContainer,
               }}
               items={getItems(panelStyle)}
            />
         </Modal>
      </>
   );
}
