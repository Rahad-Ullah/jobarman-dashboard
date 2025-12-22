/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import { IUser } from "@/types/user";
import EditAdminForm from "../forms/admin/EditAdminForm";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";

// handle delete
const handleDelete = async (id: string) => {
  toast.loading("Deleting...", { id: "delete-admin" });
  try {
    const res = await nextFetch(`/admin/${id}`, {
      method: "DELETE",
    });
    if (res?.success) {
      toast.success(res?.message as string, { id: "delete-admin" });
      revalidate("admins");
      window.location.reload();
    } else {
      toast.error(res?.message || "Failed to delete admin", {
        id: "delete-admin",
      });
    }
  } catch (error) {
    console.error(error);
  }
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
      return <p className="px-2">{item?.name}</p>;
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
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.phone || "-"}</p>;
    },
  },
  {
    accessorKey: "access",
    header: "Access",
    cell: ({ row }) => {
      const item = row.original as any;
      return <p className="px-2">{item?.adminaccess?.length || 0} Pages</p>;
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
            <EditAdminForm admin={item as any} />
          </Modal>
          {/* Delete */}
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            title="Are you sure to delete this admin?"
            itemId={item?._id?.toString() || ""}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default adminTableColumns;
