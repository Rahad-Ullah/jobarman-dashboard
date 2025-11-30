"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash } from "lucide-react";
import Modal from "../modals/Modal";
import { ICategory } from "@/types/category";
import DeleteModal from "../modals/DeleteModal";
import Image from "next/image";
import EditCategoryForm from "../forms/category/EditCategory";
import { IMAGE_URL } from "@/config/env-config";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";

// handle delete item
const handleDelete = async (id: string) => {
  toast.loading("Deleting...", { id: "delete-category-toast" });
  try {
    const res = await nextFetch(`/job-category/${id}`, {
      method: "DELETE",
    });
    if (res?.success) {
      toast.success("Category deleted successfully", {
        id: "delete-category-toast",
      });
      revalidate("categories");
      window.location.reload();
    } else {
      toast.error("Failed to delete category", { id: "delete-category-toast" });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const categoryTableColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          #{row.index + 1}
        </Button>
      );
    },
  },
  {
    accessorKey: "icon",
    header: () => <span>Icon</span>,
    cell: ({ row }) => {
      const item = row.original as ICategory;
      return (
        <Image
          src={`${IMAGE_URL}${item?.image}`}
          alt="icon"
          width={70}
          height={70}
          className="p-2"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original as ICategory;
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          {item?.name}
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const item = row.original as ICategory;
      return (
        <div className="flex items-center justify-center gap-2">
          {/* edit */}
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-primary">
                <PencilLine />
              </Button>
            }
            dialogTitle=""
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <EditCategoryForm item={item} />
          </Modal>
          {/* delete */}
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            itemId={item?._id?.toString()}
            action={handleDelete}
            actionBtnText="Delete"
          />
        </div>
      );
    },
  },
];

export default categoryTableColumns;
