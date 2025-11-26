"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
      
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 5000, 
          style: {
            background: '#333',
            color: '#fff',
            zIndex: 9999, 
          },
          
          success: {
            duration: 5000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
        
        containerStyle={{
          top: 60, 
          zIndex: 99999, 
        }}
      />
    </SessionProvider>
  );
}