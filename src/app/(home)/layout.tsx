'use client';
import { Layout } from 'antd';
import HeaderPage from '@/components/Header/Header';
import Providers from '@/components/Provider/Provider';
import { usePathname } from 'next/navigation';

const { Content, Footer } = Layout;

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const pathname = usePathname();

   // Kiểm tra nếu đường dẫn chứa '/dashboard/setting' thì không áp dụng layout này
   if (pathname.startsWith('/dashboard/setting')) {
      return <>{children}</>;
   }
   return (
      <Providers>
         <HeaderPage />
         <Content
            style={{
               padding: '0 48px',
               background: '#dbdbdb',
            }}
         >
            <div
               style={{
                  padding: 24,
                  minHeight: 380,
               }}
            >
               <div>{children}</div>
            </div>
         </Content>
         <Footer
            style={{
               textAlign: 'center',
               backgroundColor: '#212121',
               color: 'white',
            }}
         >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
         </Footer>
      </Providers>
   );
}
