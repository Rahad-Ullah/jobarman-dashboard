"use client";

import { useState, useEffect } from "react";
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

const formSchema = z.object({
  planType: z.string().min(1, "Select a plan type"),
  customerType: z.string().min(1, "Select a customer type"),
  feature: z.string().optional(),
  price: z.coerce.number().min(0, "Enter a valid price"),
});

type FormValues = z.infer<typeof formSchema>;

export interface ISubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  priceId: string;
  product: string;
  payment_link: string;
  for: "employee" | "recruiter" | string;
  features: string[];
  paymentId: string;
  referenceId: string;
  recurring: "month" | "year" | string;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Props = {
  initialPlan: ISubscriptionPlan;
};

export default function EditPlanForm({ initialPlan }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planType: initialPlan.planType,
      customerType: initialPlan.customerType,
      feature: "",
      price: initialPlan.price,
    },
  });

  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    setFeatures(initialPlan.features);
  }, [initialPlan]);

  const handleAddFeature = (feature: string) => {
    if (feature.trim()) {
      setFeatures([...features]);
      form.setValue("feature", "");
    }
  };

  const handleSubmit = (values: FormValues) => {
    const updatedPlan: Plan = {
      planType: values.planType,
      customerType: values.customerType,
      price: values.price,
      features,
    };

    // Handle the updated plan (e.g., send to API or update state)
    console.log("Updated Plan:", updatedPlan);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Edit Plan</h2>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="planType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Plan Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free Plan">Free Plan</SelectItem>
                      <SelectItem value="Silver Plan">Silver Plan</SelectItem>
                      <SelectItem value="Platinum Plan">
                        Platinum Plan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerType"
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
                      <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                      <SelectItem value="Recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Price Field */}
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

        {/* Feature Input */}
        <FormField
          control={form.control}
          name="feature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Feature</FormLabel>
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
              className="flex items-center justify-between text-sm bg-gray-50 rounded px-3"
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
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
