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
import { ISubscriptionPlan } from "@/components/page/subscriptions/PlanCard";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";
import { subscriptionPlanTypes } from "@/constants/subscription";

const formSchema = z.object({
  name: z.string().min(1, "Plan name is required").optional(),
  price: z.coerce
    .number()
    .nonnegative("Price must be greater than or equal to 0")
    .optional(),
  for: z.string().nonempty("For is required").optional(),
  feature: z.string().optional(),
  paymentId: z.string().min(1, "Payment ID is required").optional(),
  referenceId: z.string().min(1, "Reference ID is required").optional(),
  recurring: z.string().nonempty("Recurring is required").optional(),
  interval: z.number().positive("Interval must be greater than 0").optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  initialPlan: ISubscriptionPlan;
};

export default function EditPlanForm({ initialPlan }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialPlan.name,
      price: initialPlan.price,
      for: initialPlan.for,
      paymentId: initialPlan.paymentId,
      referenceId: initialPlan.referenceId,
      recurring: initialPlan.recurring,
      interval: initialPlan.interval,
      feature: "",
    },
  });

  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    setFeatures(initialPlan.features);
  }, [initialPlan]);

  const handleAddFeature = (feature: string) => {
    if (feature.trim()) {
      setFeatures([...features, feature.trim()]);
      form.setValue("feature", "");
    }
  };

  const handleSubmit = async (values: FormValues) => {
    toast.loading("Updating...", { id: "update-plan-toast" });
    // check if features array is empty
    if (features.length === 0) {
      toast.error("Please add at least one feature", {
        id: "update-plan-toast",
      });
      return;
    }

    const payload = {
      ...values,
      features,
    };

    try {
      const res = await nextFetch(`/package/${initialPlan._id}`, {
        method: "PATCH",
        body: payload,
      });
      if (res?.success) {
        toast.success(res?.message as string, { id: "update-plan-toast" });
        revalidate("subscription-packages");
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to update plan", {
          id: "update-plan-toast",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Edit Plan</h2>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
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
                  defaultValue={field.value?.toString()}
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
