"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";
import { subscriptionPlanTypes } from "@/constants/subscription";

const formSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.coerce
    .number()
    .nonnegative("Price must be greater than or equal to 0"),
  for: z.enum(["employee", "recruiter"], {
    required_error: "Plan type is required",
  }),
  feature: z.string().optional(),
  paymentId: z.string().min(1, "Payment ID is required"),
  referenceId: z.string().min(1, "Reference ID is required"),
  recurring: z.string().nonempty("Recurring is required"),
  interval: z.coerce
    .number()
    .positive("Recurring count must be greater than 0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddPlanForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      for: "employee",
      feature: "",
      paymentId: "",
      referenceId: "",
      recurring: "",
      interval: 1,
    },
  });

  const [features, setFeatures] = useState<string[]>([]);

  const handleAddFeature = (feature: string) => {
    if (feature.trim()) {
      setFeatures([...features, feature.trim()]);
      form.setValue("feature", "");
    }
  };

  const onSubmit = async (values: FormValues) => {
    toast.loading("Adding...", { id: "add-plan-toast" });
    // check if features array is empty
    if (features.length === 0) {
      toast.error("Please add at least one feature", { id: "add-plan-toast" });
      return;
    }

    try {
      const res = await nextFetch("/package", {
        method: "POST",
        body: {
          ...values,
          features,
        },
      });
      if (res?.success) {
        toast.success(res?.message as string, { id: "add-plan-toast" });
        revalidate("subscription-packages");
        window.location.reload();
        form.reset();
      } else {
        toast.error(res?.message || "Failed to add plan", {
          id: "add-plan-toast",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Add Plan</h2>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select Plan Name" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      {subscriptionPlanTypes.map((type, index) => (
                        <SelectItem value={type.name} key={index}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="for"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Customer Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (USD/month)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 19.99"
                  {...field}
                  className="h-10 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* paymentId */}
        <FormField
          control={form.control}
          name="paymentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Payment ID"
                  {...field}
                  className="h-10 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* referenceId */}
        <FormField
          control={form.control}
          name="referenceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Reference ID"
                  {...field}
                  className="h-10 bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* recurring */}
        <FormField
          control={form.control}
          name="recurring"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurring</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Recurring" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="year">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* interval count */}
        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval Count</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Interval Count" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((count) => (
                      <SelectItem value={count.toString()} key={count}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feature Input */}
        <FormField
          control={form.control}
          name="feature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feature</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Unlimited patient appointments"
                    {...field}
                    className="h-10 bg-white"
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => handleAddFeature(field.value || "")}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feature List */}
        <ul>
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between text-sm bg-gray-50 rounded"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600 w-4 h-4" />
                <span>{feature}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setFeatures(features.filter((_, i) => i !== idx));
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="px-8">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
