import { Button, Form, Input, Modal } from 'antd';
import { useAddItem } from '@/hooks/api/useApi';

interface CreateModalProps {
   open: boolean;
   onCancel: () => void;
}

export default function CreateModal({ open, onCancel }: CreateModalProps) {
   const [form] = Form.useForm();

   const { mutate: addItem } = useAddItem();

   const handleSubmit = () => {
      form.validateFields().then((values) => {
         addItem(values);

         form.resetFields();

         onCancel();
      });
   };

   return (
      <>
         <Modal
            title="Tạo mới dự án"
            open={open}
            onCancel={onCancel}
            footer={[
               <Button key="submit" type="primary" onClick={handleSubmit}>
                  Submit
               </Button>,
            ]}
         >
            <Form
               form={form}
               name="wrap"
               labelCol={{
                  flex: '110px',
               }}
               labelAlign="left"
               labelWrap
               wrapperCol={{
                  flex: 1,
               }}
               colon={false}
               style={{
                  maxWidth: 600,
               }}
            >
               <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập tiêu đề!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập mô tả!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Thumbnail URL"
                  name="thumbnail"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập đường dẫn hình thu nhỏ!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
}
