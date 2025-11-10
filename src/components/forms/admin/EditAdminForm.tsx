"use client";

import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Permission routes
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
];

const formSchema = z.object({
  permission: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  admin: {
    name: string;
    email: string;
    phone: string;
    permissions: string[];
  };
};

export default function EditAdminForm({ admin }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permission: "",
    },
  });

  const [permissions, setPermissions] = useState<string[]>(
    admin.permissions.includes("/profile")
      ? admin.permissions
      : ["/profile", ...admin.permissions]
  );

  const handleAddPermission = (route: string) => {
    if (!permissions.includes(route)) {
      setPermissions([...permissions, route]);
    }
  };

  const handleRemovePermission = (route: string) => {
    if (route !== "/profile") {
      setPermissions(permissions.filter((r) => r !== route));
    }
  };

  const onSubmit = () => {
    console.log("Updated permissions:", permissions);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Edit Admin</h2>

        {/* Read-only Info */}
        <div className="space-y-2">
          <Input value={admin.name} readOnly className="bg-muted" />
          <Input value={admin.email} readOnly className="bg-muted" />
          <Input value={admin.phone} readOnly className="bg-muted" />
        </div>

        {/* Permission Dropdown */}
        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit Permission</FormLabel>
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
              availablePermissions.find((p) => p.route === route)?.label ||
              (route === "/profile" ? "Profile" : route);
            return (
              <li
                key={route}
                className={`flex items-center justify-between text-sm bg-gray-50 rounded px-3 ${
                  route === "/profile" && "py-3"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-4 h-4" />
                  <span>{label}</span>
                </div>
                {route !== "/profile" && (
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
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
