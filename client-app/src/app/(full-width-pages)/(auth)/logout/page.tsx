'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Logout = () => {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    logout();

    router.push("/signin");
  }, [logout, router]);

  return <div>Logging out...</div>; // Optional loading state
};

export default Logout;
