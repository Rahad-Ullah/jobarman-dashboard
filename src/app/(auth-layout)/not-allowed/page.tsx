"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";

const NotFoundPage = () => {
  const { logout } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <h1 className="text-5xl font-bold">405</h1>
      <p className="text-xl font-medium">
        Sorry! You have no permission to access this page!
      </p>
      <Button variant={"outline"} onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default NotFoundPage;
