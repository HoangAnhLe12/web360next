'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Button, Flex, Layout, Result, Spin, Tooltip } from 'antd';

import { DoubleLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useImagesWithId } from '@/hooks/api/useApi';

const { Content, Header } = Layout;

interface DataItem {
   id: number | string;
   startImage: number | string;
   title: string;
   description: string;
   thumbnail: string;
   audio: string;
}

const SettingPage: React.FC = () => {
   const router = useRouter();
   const params = useParams();
   const { id } = params;
   const validId = Array.isArray(id) ? id[0] : id;

   const { data, isPending, error } = useImagesWithId('items', validId, true);

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

   if (!data) {
      return <div>No data available</div>;
   }

   // Ép kiểu data thành DataItem để sử dụng
   const dataItem: DataItem = data[0] as DataItem;

   console.log(dataItem);

   return (
      <Layout>
         <Header className="flex items-center bg-white border-b border-gray-200">
            <Tooltip title="Back to Dashboard">
               <Button shape="circle" icon={<DoubleLeftOutlined />} onClick={() => router.push('/dashboard')} />
            </Tooltip>
            <h1 className="text-center ml-[30px] text-[20px] font-[500]">{dataItem.title} </h1>
         </Header>
         <Content className="bg-[#dbdbdb] h-[100vh] pb-0 pt-0 pl-[48px] pr-[48px]"></Content>
      </Layout>
   );
};

export default SettingPage;
