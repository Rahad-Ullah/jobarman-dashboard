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
import { revalidate } from "@/helpers/revalidateHelper";
import { addCategoryFormSchema } from "@/schemas/formSchemas/category/addCategory";
import { nextFetch } from "@/utils/nextFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AddCategoryForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addCategoryFormSchema>) {
    if (!file) {
      setFileError("Icon is required");
    }
    const payload = new FormData();
    payload.append("name", values.name);
    if (file) payload.append("image", file);

    toast.loading("Creating...", { id: "create-category" });
    try {
      const res = await nextFetch("/job-category", {
        method: "POST",
        body: payload,
      });
      if (res?.success) {
        toast.success(res?.message as string, {
          id: "create-category",
        });
        revalidate("categories");
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to create category", {
          id: "create-category",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-center mb-4">Add Category</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormItem className="w-full flex justify-center">
          <FormControl className="mt-0">
            <ImageUpload setFile={setFile} fallbackImage={""} />
          </FormControl>
        </FormItem>
        {fileError && (
          <p className="text-red-500 text-sm text-center">{fileError}</p>
        )}
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
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
