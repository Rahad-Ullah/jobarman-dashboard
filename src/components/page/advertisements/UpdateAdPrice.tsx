"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidate } from "@/helpers/revalidateHelper";
import { nextFetch } from "@/utils/nextFetch";
import toast from "react-hot-toast";

// update ad status
const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const price = formData.get("price");

  toast.loading("Updating...", { id: "update-ad" });
  try {
    const res = await nextFetch(`/admin/spotlight/price`, {
      method: "POST",
      body: { price: Number(price) },
    });
    console.log(res);
    if (res?.success) {
      toast.success(res?.message as string, { id: "update-ad" });
      revalidate("adPrice");
      window.location.reload();
    } else {
      toast.error(res?.message || "Failed to update", { id: "update-ad" });
    }
  } catch (error) {
    console.error(error);
  }
};

export default function UpdateAdPrice({ price }) {
  return (
    <section className="p-8">
      {/* Action Buttons */}
      <form onSubmit={handleUpdate} className="flex items-center gap-4">
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          defaultValue={price}
          className=""
        />
        <Button type="submit" className="px-8 h-12">
          Update
        </Button>
      </form>
    </section>
  );
}
