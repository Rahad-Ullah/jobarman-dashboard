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
import { addCategoryFormSchema } from "@/schemas/formSchemas/category/addCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addCategoryForm = () => {
  const [file, setFile] = useState<File | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addCategoryFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-center">Add Category</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
        <div className="w-full flex gap-2 items-center">
          <FormItem className="w-full !mt-0">
            <FormLabel>Category Icon</FormLabel>
            <FormControl className="mt-0">
              <ImageUpload setFile={setFile} fallbackImage={""} />
            </FormControl>
          </FormItem>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit" className="rounded-md px-10">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default addCategoryForm;
