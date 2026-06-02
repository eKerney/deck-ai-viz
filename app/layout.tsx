// 'use client'
// import "./globals.css";
// import { ReduxProvider } from "./store/ReduxProvider";
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>{children}</ReduxProvider>
//       </body>
//     </html>
//   );
// }
//
//
'use client'
import "./globals.css";

import { Provider } from 'react-redux';
import store from './store/store';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
