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

const AddCategoryForm = () => {
  const [file, setFile] = useState<File | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addCategoryFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values, file);
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
