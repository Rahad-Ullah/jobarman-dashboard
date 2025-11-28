"use client";

import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { revalidate } from "@/helpers/revalidateHelper";
import { nextFetch } from "@/utils/nextFetch";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PrivacyPolicy = ({ data }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data?.content || "");

  const handleUpdate = async () => {
    toast.loading("Updating...", { id: "update-privacy" });
    try {
      const res = await nextFetch("/disclaimer", {
        method: "POST",
        body: { type: "privacy", content },
      });

      if (res?.success) {
        toast.success(res?.message as string, { id: "update-privacy" });
        revalidate("privacy");
      } else {
        toast.error(res?.message || "Failed to update privacy", {
          id: "update-privacy",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <PageTitle>Privacy Policy</PageTitle>
      <Card className="p-4 shadow-sm">
        <JoditEditor
          ref={editor}
          value={content}
          config={{ height: 600, theme: "light", readonly: false }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </Card>
      <div className="flex justify-end">
        <Button
          className="bg-gradient-to-r from-primary-foreground to-primary px-10 rounded-md"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
