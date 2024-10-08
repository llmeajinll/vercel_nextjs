// 'use client';

import { Metadata } from 'next';
// import { Provider } from 'react-redux';
// import { store } from '../src/store/store';
import { StoreProvider } from '../src/app/store/StoreProvider';

import './globals.css';
export const metadata: Metadata = {
  title: 'test',
  description: 'Generated by create next app',
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <Provider store={store}>
//       <html lang='en'>
//         <body>{children}</body>
//       </html>
//     </Provider>
//   );
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
