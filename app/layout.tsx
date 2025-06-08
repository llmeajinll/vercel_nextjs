

import { Metadata } from 'next';
// import { Provider } from 'react-redux';
// import { store } from '../src/store/store';
import { StoreProvider } from '../src/app/store/StoreProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers";

import './globals.css';

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
          <html lang='ko'>
            <body>

                    {children}
            </body>
          </html>
        </StoreProvider>

  );
}
