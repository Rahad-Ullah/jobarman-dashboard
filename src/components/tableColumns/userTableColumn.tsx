"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Lock, LockOpen, PencilLine, Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import UserDetails from "../page/users/userDetails/UserDetails";
import { ICategory } from "@/types/category";
import Image from "next/image";
import EditCategoryForm from "../forms/category/EditCategory";

// handle delete
const handleDelete = async () => {
  // perform api here...
};

// table column definition
const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      const item = row.original as ICategory;
      return <p className="px-2">#{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const item = row.original as ICategory;
      return (
        <Image
          src={item?.icon}
          width={100}
          height={100}
          alt="icon"
          className="max-w-12 max-h-12"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const item = row.original as ICategory;
      return <p className="px-2">{item?.name}</p>;
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
            <EditCategoryForm item={item} />
          </Modal>
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            title="Are you sure to delete this category?"
            itemId={item?._id?.toString() || ""}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default columns;
