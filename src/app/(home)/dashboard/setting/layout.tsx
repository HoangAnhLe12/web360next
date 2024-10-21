'use client';
import Providers from '@/components/Provider/Provider';

export default function SettingLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <Providers>
         <>{children}</>
      </Providers>
   );
}
