'use client';
import { Col, Row, Flex, Spin, Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import CardItem from '@/components/Card/Card';
import { useImages } from '@/hooks/api/useImage';

interface DataItem {
   id: number;
   startImage: number;
   title: string;
   description: string;
   thumbnail: string;
   audio: string;
}

function ShowcasePage() {
   const { data: items, isPending, error } = useImages('items');

   if (isPending)
      return (
         <div className="flex justify-center items-center h-[100vh]">
            <Flex align="center" gap="middle">
               <Spin
                  indicator={
                     <LoadingOutlined
                        style={{
                           fontSize: 60,
                        }}
                        spin
                     />
                  }
               />
            </Flex>
         </div>
      );

   if (error)
      return (
         <div className="flex justify-center items-center h-[100vh]">
            <Result
               status="500"
               title="500"
               subTitle="Sorry, something went wrong."
               extra={<Button type="primary">Reload</Button>}
            />
         </div>
      );

   return (
      <>
         <div className="p-[15px] mt-[10px] mb-[30px]">
            <h1 className="text-[65px] font-[600]">360° Showcase</h1>
            <p className="text-[22px] font-[300]">Our favourite tours curated from over 5000+ members</p>
         </div>
         <Row gutter={[48, 40]}>
            {items.map((item: DataItem) => (
               <Col span={12} key={item.id}>
                  <CardItem item={item} />
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ShowcasePage;
