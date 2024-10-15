"use client"
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/navBar/page";
function Provider ({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <SessionProvider >
        {children}
    </SessionProvider>
  );
}
 export default Provider;