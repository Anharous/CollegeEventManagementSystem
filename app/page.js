"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Signup from "./auth/signup/page";

export default function SignInPage() {
  const router = useRouter();

  return (
    
        <Signup/>
      
  );
}
