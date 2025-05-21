"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Dashbaord from "./dashboard/page";
import { useRouter } from "next/navigation";

export default function Home() {

  const route = useRouter();
  return (
   <div>
     Hello and Welcome
     <Button onClick={route}>DashBoard</Button>
   </div>
  );
}
