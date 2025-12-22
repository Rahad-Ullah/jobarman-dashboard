"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Lock, LockOpen } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import UserDetails from "../page/users/userDetails/UserDetails";
import { IUser } from "@/types/user";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";

// handle block/unblock user
const handleUpdateStatus = async (id: string) => {
  toast.loading("Updating status...", { id: "updateStatus" });
  try {
    const res = await nextFetch(`/user/change-status/${id}`, {
      method: "PUT",
    });
    console.log(res);
    if (res?.success) {
      toast.success(res?.message || "Status updated successfully", {
        id: "updateStatus",
      });
    } else {
      toast.error(res?.message || "Failed to update status", {
        id: "updateStatus",
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while updating status", {
      id: "updateStatus",
    });
  }
};

// table column definition
const columns: ColumnDef<IUser>[] = [
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
      return <p className="px-2 capitalize">{item?.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.email || "-"}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Phone",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.phone || "-"}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.address || "-"}</p>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2 capitalize">{item?.role?.toLowerCase()}</p>;
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
                <Eye />
              </Button>
            }
            dialogTitle=""
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <UserDetails user={item} />
          </Modal>
          {/* Block or unblock */}
          {item.status === "delete" ? (
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
              action={handleUpdateStatus}
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
              action={handleUpdateStatus}
            />
          )}
        </div>
      );
    },
  },
];

export default columns;
