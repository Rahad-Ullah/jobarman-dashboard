"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { nextFetch } from "@/utils/nextFetch";
import toast from "react-hot-toast";
import { revalidate } from "@/helpers/revalidateHelper";

const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
});

type FaqFormValues = z.infer<typeof faqSchema>;

export default function AddFaqForm() {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const handleSubmit = async (values: FaqFormValues) => {
    toast.loading("Creating...", { id: "create-faq" });

    const res = await nextFetch("/faq", {
      method: "POST",
      body: values,
    });

    if (res?.success) {
      toast.success(res?.message as string, { id: "create-faq" });
      revalidate("faqs");
      form.reset();
      window.location.reload();
    } else {
      toast.error(res?.message || "Failed to create FAQ", { id: "create-faq" });
    }
  };

  return (
    <div className="rounded-lg w-full relative">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-center">Add New FAQ</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Question Field */}
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. What types of jobs can I find on Ladders?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Answer Field */}
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. You can find executive-level jobs across industries."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" className="px-8">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
