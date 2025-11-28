"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import { IJobPost } from "@/types/job-post";
import JobPostDetails from "../page/job-posts/JobPostDetails";
import { formatEnum } from "@/utils/formatEnum";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";

// handle delete
const handleDelete = async (id: string) => {
  toast.loading("Deleting...", { id: "delete-job-post" });
  try {
    const res = await nextFetch(`/job-post/${id}`, {
      method: "DELETE",
    });
    if (res?.success) {
      toast.success(res?.message as string, { id: "delete-job-post" });
      revalidate("job-posts");
      window.location.reload();
    } else {
      toast.error(res?.message || "Failed to delete job post", {
        id: "delete-job-post",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const jobPostTableColumns: ColumnDef<IJobPost>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2">{item?.recruiter?.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2 lowercase">{item?.recruiter?.email}</p>;
    },
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2">{formatEnum(item?.job_type || "")}</p>;
    },
  },
  {
    accessorKey: "jobLevel",
    header: "Job Level",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2">{formatEnum(item?.job_level || "")}</p>;
    },
  },
  {
    accessorKey: "End Date",
    header: "End Date",
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="px-2 lowercase">{item?.deadline?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as IJobPost;
      return <p className="capitalize px-2">{item?.status}</p>;
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
            className="max-w-[50vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-6"
          >
            <JobPostDetails item={item} />
          </Modal>

          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            title="Are you sure to delete this job post?"
            itemId={item?._id?.toString()}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default jobPostTableColumns;
