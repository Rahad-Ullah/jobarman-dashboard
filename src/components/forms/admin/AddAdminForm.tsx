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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Check, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";

// Route-based permission list
const availablePermissions = [
  { route: "/", label: "Home" },
  { route: "/users", label: "Users" },
  { route: "/admins", label: "Admins" },
  { route: "/job-posts", label: "Job Posts" },
  { route: "/subscriptions", label: "Subscriptions" },
  { route: "/categories", label: "Categories" },
  { route: "/advertisements", label: "Advertisements" },
  { route: "/terms-and-conditions", label: "Terms & Conditions" },
  { route: "/privacy-policy", label: "Privacy Policy" },
  { route: "/faq", label: "FAQ" },
  { route: "/supports", label: "Supports" },
  { route: "/profile", label: "Profile" },
  { route: "/notifications", label: "Notifications" },
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().nonempty("Phone is required"),
  permission: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddAdminForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      permission: "",
    },
  });

  const defaultPermissions = ["/profile", "/notifications"];
  const [permissions, setPermissions] = useState<string[]>(defaultPermissions);

  const handleAddPermission = (route: string) => {
    if (!permissions.includes(route)) {
      setPermissions([...permissions, route]);
    }
  };

  const handleRemovePermission = (route: string) => {
    if (!defaultPermissions.includes(route)) {
      setPermissions(permissions.filter((r) => r !== route));
    }
  };

  const onSubmit = async (values: FormValues) => {
    toast.loading("Adding...", { id: "add-admin-toast" });
    const payload = {
      ...values,
      adminaccess: permissions,
    };
    try {
      const res = await nextFetch("/admin", {
        method: "POST",
        body: payload,
      });
      if (res?.success) {
        toast.success(res?.message as string, { id: "add-admin-toast" });
        revalidate("admins");
        window.location.reload();
        form.reset();
      } else {
        toast.error(res?.message || "Failed to add admin", {
          id: "add-admin-toast",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Add Admin</h2>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Permission Dropdown */}
        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Permission</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    handleAddPermission(value);
                    form.setValue("permission", "");
                  }}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePermissions.map((perm) => {
                      const isSelected = permissions.includes(perm.route);
                      return (
                        <SelectItem key={perm.route} value={perm.route}>
                          <div className="flex justify-between items-center gap-2">
                            <span>{perm.label}</span>
                            {isSelected && <Check className="w-4 h-4" />}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Permission List */}
        <ul>
          {permissions.map((route) => {
            const label =
              availablePermissions.find((p) => p.route === route)?.label || "";
            return (
              <li
                key={route}
                className={`flex items-center justify-between text-sm bg-gray-50 rounded px-3 ${
                  defaultPermissions.includes(route) && "py-3"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-4 h-4" />
                  <span>{label}</span>
                </div>
                {!defaultPermissions.includes(route) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePermission(route)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                )}
              </li>
            );
          })}
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
