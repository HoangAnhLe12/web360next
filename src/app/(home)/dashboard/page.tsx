'use client';
import CreateModal from '@/components/Create/Modal/CreateModal';
import { useImages } from '@/hooks/api/useApi';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Flex, Result, Spin, Table } from 'antd';
import { useState } from 'react';

function Dashboard() {
   const { data: items, isPending, error } = useImages('items');
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

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

   const columns = [
      {
         title: 'Name',
         dataIndex: 'title',
         key: 'title',
         render: (text: string) => <a>{text}</a>,
      },
      {
         title: 'Description',
         dataIndex: 'description',
         key: 'description',
         render: (text: string) => <p className="cursor-pointer">{text}</p>,
      },
      {
         title: 'Time',
         dataIndex: 'time',
         key: 'time',
      },
   ];

   return (
      <>
         <div className="p-[10px] mt-[5px] mb-[30px]">
            <h3 className="text-[28px] font-[600]">Your photos </h3>
            <p className="text-[20px] font-[300]">Add photos as you wish </p>
         </div>
         <div className="h-[100vh]">
            <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
               {' '}
               Add
            </Button>
            <Table columns={columns} dataSource={items} />
            <CreateModal open={isModalOpen} onCancel={handleCancel} />
         </div>
      </>
   );
}

export default Dashboard;
