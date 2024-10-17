// app/providers.jsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }) {
   // Tạo một QueryClient mới cho mỗi render để tránh chia sẻ trạng thái giữa các request khác nhau
   const [queryClient] = useState(() => new QueryClient());

   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
