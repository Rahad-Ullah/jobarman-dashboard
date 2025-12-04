"use client";

import { LoaderCircle } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-white/30 dark:bg-black/30 backdrop-blur-md">
      <h2 className="text-xl font-medium flex items-center gap-2">
        <LoaderCircle className="text-2xl animate-spin" /> Loading...
      </h2>
    </div>
  );
};

export default LoadingPage;
