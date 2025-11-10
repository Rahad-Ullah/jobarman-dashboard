"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Lock, LockOpen, PencilLine } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import { IUser } from "@/types/user";
import EditAdminForm from "../forms/admin/EditAdminForm";

// handle status update
const handleStatusUpdate = async () => {
  // perform api here...
};

// table column definition
const adminTableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">#{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <p className="px-2">
          {item?.firstName} {item?.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.phone}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-center gap-1.5">
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-primary">
                <PencilLine />
              </Button>
            }
            dialogTitle=""
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <EditAdminForm
              admin={{
                name: "Rahad Hossain",
                email: "rahad@example.com",
                phone: "+8801234567890",
                permissions: ["/", "/users", "/faq"],
              }}
            />
          </Modal>
          {/* Block or unblock */}
          {item.isBlocked ? (
            <DeleteModal
              triggerBtn={
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-red-500"
                >
                  <Lock />
                </Button>
              }
              title="Are you sure to unblock this user?"
              description="You can block the user later."
              itemId={item?._id?.toString() || ""}
              action={handleStatusUpdate}
            />
          ) : (
            <DeleteModal
              triggerBtn={
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-gray-400"
                >
                  <LockOpen />
                </Button>
              }
              title="Are you sure to block this user?"
              description="You can unblock the user later."
              itemId={item?._id?.toString() || ""}
              action={handleStatusUpdate}
            />
          )}
        </div>
      );
    },
  },
];

export default adminTableColumns;
