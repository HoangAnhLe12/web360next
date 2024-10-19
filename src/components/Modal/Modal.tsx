'use client';
import { useState } from 'react';
import { Button, Carousel, Collapse, Image, Modal, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

interface Image {
   url: string; // Thay vì chỉ dùng chuỗi, chúng ta định nghĩa cấu trúc cho các hình ảnh
}
interface PointsPopup {
   id: number | string;
   title: string;
   type: string;
   description: string;
   videoId: string;
   images: Image[];
}
interface PointsGate {
   id: number | string;
   type: string;
   title: string;
   targetId: number;
}

type Points = PointsPopup | PointsGate;

interface InfoModalProps {
   open: boolean;
   onClose: () => void;
   data: Points;
}

export default function InfoModal({ open, onClose, data }: InfoModalProps) {
   const [loading, setLoading] = useState(false);

   const isPopup = (point: Points): point is PointsPopup => {
      return point.type === 'popup';
   };

   const isHaveData = isPopup(data);

   const { token } = theme.useToken();
   const panelStyle = {
      marginBottom: 24,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none',
   };
   // Hàm kiểm tra xem giá trị có trống hay không
   const isEmpty = (value: unknown) => {
      if (typeof value === 'string') {
         return value.trim() === ''; // Kiểm tra chuỗi rỗng hoặc chỉ chứa khoảng trắng
      } else if (Array.isArray(value)) {
         return value.length === 0; // Kiểm tra mảng rỗng
      }
      return !value; // Kiểm tra các giá trị khác (undefined, null, số 0)
   };

   // Tạo danh sách các thông tin cần hiển thị dựa trên dữ liệu
   const getFilteredInfo = () => {
      if (!isHaveData) return [];

      const infoArray = [];
      if (!isEmpty(data.description)) {
         infoArray.push({
            key: '1',
            label: 'Mô tả sản phẩm',
            children: <p>{data.description}</p>,
            style: panelStyle,
         });
      }
      if (!isEmpty(data.images)) {
         infoArray.push({
            key: '2',
            label: 'Hình ảnh sản phẩm',
            children: (
               <Carousel arrows infinite={true}>
                  {data.images.map((image, index) => (
                     <Image key={index} src={image.url} alt={data.title} />
                  ))}
               </Carousel>
            ),
            style: panelStyle,
         });
      }
      console.log(data.images);

      if (!isEmpty(data.videoId)) {
         infoArray.push({
            key: '3',
            label: 'Video của sản phẩm',
            children: (
               <iframe
                  src={data.videoId}
                  width={'100%'}
                  height={'250px'}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
               ></iframe>
            ),
            style: panelStyle,
         });
      }

      console.log(infoArray);
      return infoArray;
   };

   const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 3000);
   };

   return (
      <>
         {isHaveData && (
            <Modal
               style={{ top: 40 }}
               width={'35vw'}
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
                  defaultActiveKey={['1']}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  style={{
                     background: token.colorBgContainer,
                  }}
                  items={getFilteredInfo()}
               />
            </Modal>
         )}
      </>
   );
}
