'use client'
import ListCard from "@/components/listCard/listCard";
import LoginPage from "./pages/login/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavBar from "@/components/navBar/page";


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return (
      <main className="">
        <LoginPage />
      </main>
    );
  }else{
    router.push("/pages/dashboard");
  }
}
