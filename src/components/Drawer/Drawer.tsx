'use client';
import { Col, Divider, Drawer, Row } from 'antd';

interface InfoDrawerProps {
   open: boolean;
   onClose: () => void;
   data: { title: string };
}

interface DescriptionItemProps {
   title: string;
   content: string;
}

const InfoDrawer = ({ open, onClose }: InfoDrawerProps) => {
   const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
      <div className="site-description-item-profile-wrapper">
         <p className="site-description-item-profile-p-label">{title}:</p>
         {content}
      </div>
   );

   return (
      <Drawer width={378} placement="right" closable={true} onClose={onClose} open={open}>
         <p
            className="site-description-item-profile-p"
            style={{
               marginBottom: 24,
            }}
         >
            User Profile
         </p>
         <Divider />
         <Row>
            <Col span={12}>
               <DescriptionItem title="Department" content="XTech" />
            </Col>
            <Col span={12}>
               <DescriptionItem title="Supervisor" content={'Lin'} />
            </Col>
         </Row>
         <Divider />
      </Drawer>
   );
};

export default InfoDrawer;
