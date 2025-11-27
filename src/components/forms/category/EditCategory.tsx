"use client";

import ImageUpload from "@/components/page/profile/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IMAGE_URL } from "@/config/env-config";
import { revalidate } from "@/helpers/revalidateHelper";
import { editCategoryFormSchema } from "@/schemas/formSchemas/category/editCategory";
import { nextFetch } from "@/utils/nextFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const EditCategoryForm = ({ item }) => {
  const [file, setFile] = useState<File | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof editCategoryFormSchema>>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: { ...item },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editCategoryFormSchema>) {
    const payload = new FormData();
    if (values.name) payload.append("name", values.name);
    if (file) payload.append("image", file);

    toast.loading("Updating...", { id: "update-category" });
    try {
      const res = await nextFetch(`/job-category/${item._id}`, {
        method: "PATCH",
        body: payload,
      });
      if (res?.success) {
        toast.success(res?.message as string, {
          id: "update-category",
        });
        revalidate("categories");
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to update category", {
          id: "update-category",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Category</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormItem className="w-full flex justify-center">
          <FormControl>
            <ImageUpload
              setFile={setFile}
              fallbackImage={`${IMAGE_URL}${item.image}`}
            />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="submit" className="rounded-md px-10">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
