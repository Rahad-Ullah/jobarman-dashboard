"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Lock, LockOpen, Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import UserDetails from "../page/users/userDetails/UserDetails";
import { IJobPost } from "@/types/job-post";
import { Badge } from "../ui/badge";
import { JobPostStatus } from "@/constants/job-post";

// handle delete
const handleDelete = async () => {
  // perform api here...
};

// table column definition
const jobPostTableColumns: ColumnDef<IJobPost>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2">{item?.SL}</p>;
    },
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2">{item?.companyName}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2 lowercase">{item?.email}</p>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2 lowercase">{item?.contact}</p>;
    },
  },
  {
    accessorKey: "End Date",
    header: "End Date",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2 lowercase">{item?.endDate}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return (
        <Badge
          className={`capitalize font-medium text-white shadow-none rounded-full py-1.5 w-full flex justify-center ${
            item?.status === JobPostStatus.OPEN
              ? "bg-green-50 text-green-500 border-green-400"
              : item?.status === JobPostStatus.CLOSED
              ? "bg-rose-50 text-rose-500 border-rose-400"
              : item?.status === JobPostStatus.PENDING
              ? "bg-purple-50 text-purple-500 border-purple-400"
              : item?.status === JobPostStatus.REJECTED
              ? "bg-red-50 text-red-500 border-red-400"
              : ""
          }`}
        >
          {item?.status}
        </Badge>
      );
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
            <UserDetails />
          </Modal>

          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            title="Are you sure to delete this job post?"
            itemId={item?.SL?.toString() || ""}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default jobPostTableColumns;
